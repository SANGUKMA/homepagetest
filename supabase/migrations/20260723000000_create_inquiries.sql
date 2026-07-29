-- Phase 1 · inquiries — 입학·과정 문의 접수
--
-- CLAUDE.md §5: RLS 활성화와 정책은 테이블 생성과 같은 커밋에 포함한다.
-- 문의 데이터는 개인정보다. 익명 조회는 허용하지 않는다.
--
-- 권한 요약
--   anon          INSERT only            공개 접수 (의도된 공개 쓰기)
--   authenticated SELECT + UPDATE(status) 관리자 열람·상태 변경
--   DELETE        정책 없음               보존 우선

create table if not exists public.inquiries (
  id              uuid        primary key default gen_random_uuid(),
  created_at      timestamptz not null    default now(),
  name            text        not null,
  email           text        not null,
  phone           text,
  inquiry_type    text        not null,
  program_slug    text,
  message         text        not null,
  privacy_consent boolean     not null,
  status          text        not null    default 'new',

  constraint inquiries_name_length
    check (char_length(name) between 2 and 50),
  constraint inquiries_email_format
    check (email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'),
  constraint inquiries_email_length
    check (char_length(email) <= 254),
  constraint inquiries_phone_length
    check (phone is null or char_length(phone) <= 30),
  constraint inquiries_type_allowed
    check (inquiry_type in ('admission', 'program', 'other')),
  constraint inquiries_program_slug_length
    check (program_slug is null or char_length(program_slug) <= 100),
  constraint inquiries_message_length
    check (char_length(message) between 10 and 2000),
  -- 개인정보 수집·이용 동의는 저장 조건이다 (PRD FR-6)
  constraint inquiries_privacy_consent_required
    check (privacy_consent = true),
  constraint inquiries_status_allowed
    check (status in ('new', 'in_progress', 'done'))
);

comment on table public.inquiries is
  '입학·과정 문의 접수 (Phase 1). 개인정보 포함 — 익명 조회 불가.';

-- 관리자 목록은 항상 최신순, 상태 필터와 함께 조회한다.
create index if not exists inquiries_created_at_idx
  on public.inquiries (created_at desc);
create index if not exists inquiries_status_created_at_idx
  on public.inquiries (status, created_at desc);

alter table public.inquiries enable row level security;

-- 최소 권한 원칙 (CLAUDE.md §5)
-- RLS 위에 컬럼 단위 권한을 더해, 관리자도 status 외 컬럼은 수정할 수 없게 한다.
revoke all on public.inquiries from anon, authenticated;
grant insert          on public.inquiries to anon, authenticated;
grant select          on public.inquiries to authenticated;
grant update (status) on public.inquiries to authenticated;

-- INSERT — 공개 접수. 서버 zod 검증과 별개로 DB에서도 필수 조건을 강제한다.
create policy "inquiries_insert_public"
  on public.inquiries
  for insert
  to anon, authenticated
  with check (
    privacy_consent = true
    and status = 'new'
    and inquiry_type in ('admission', 'program', 'other')
  );

-- SELECT — 인증된 관리자만. 익명 조회 금지(개인정보).
create policy "inquiries_select_authenticated"
  on public.inquiries
  for select
  to authenticated
  using (true);

-- UPDATE — 인증된 관리자만. 변경 가능한 컬럼은 위 grant 로 status 하나뿐이다.
create policy "inquiries_update_authenticated"
  on public.inquiries
  for update
  to authenticated
  using (true)
  with check (status in ('new', 'in_progress', 'done'));

-- DELETE — 정책을 만들지 않는다. RLS 기본 거부로 삭제가 차단된다.
