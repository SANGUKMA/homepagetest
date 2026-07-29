/**
 * 사이트 전역 정보 · 내비게이션.
 *
 * 화면에 보이는 문자열은 `src/lib/content` 한 곳에 모아 다국어 확장에 대비한다
 * (CLAUDE.md §6 · PRD FR-14).
 *
 * ⚠️ 카피와 연락처는 원문 확보 전까지의 플레이스홀더다 (PRD §12.2 Q1·Q7).
 *    확정되면 이 파일의 값만 교체하면 되고 화면 구조는 바뀌지 않는다.
 */

export const SITE = {
  name: '한국AI융합대학',
  shortName: 'KAIC',
  tagline: '일하면서 완성하는 AI 학위',
  description: 'AI융합 학위과정 소개와 입학·과정 문의 접수',
  contact: {
    email: 'admissions@example.com',
    phone: '02-0000-0000',
    hours: '평일 09:00 – 18:00 · 점심 12:00 – 13:00',
    address: '서울특별시 ○○구 ○○로 000, 0층',
  },
  /** 푸터 고지용 기관 정보 */
  org: {
    representative: '○○○',
    registrationNumber: '000-00-00000',
    privacyOfficer: '○○○',
  },
} as const

/**
 * 사이트 절대 URL. 메타데이터(OG 태그)·sitemap·robots 의 기준값이다 (PRD §9 SEO).
 *
 * 우선순위
 *   1. `NEXT_PUBLIC_SITE_URL` — 직접 지정할 때만 쓴다
 *   2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel 이 넣어 주는 운영 도메인.
 *      커스텀 도메인을 붙이면 그 값으로 바뀌므로 손댈 일이 없다
 *   3. 로컬 개발
 *
 * 2번이 없으면 sitemap 이 `localhost` 를 가리킨 채로 배포된다. 실제로 첫 배포가
 * 그랬다. 서버에서만 호출하므로 `NEXT_PUBLIC_` 이 아닌 변수를 읽어도 된다.
 */
export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return 'http://localhost:3000'
}

export type NavItem = {
  href: string
  label: string
}

/** 헤더 주 메뉴. 문의 CTA 는 버튼으로 따로 노출하므로 여기 넣지 않는다. */
export const MAIN_NAV: NavItem[] = [
  { href: '/about', label: '대학 소개' },
  { href: '/programs', label: '학위과정' },
  { href: '/admissions', label: '입학 안내' },
  { href: '/faq', label: '자주 묻는 질문' },
]

/** 푸터 하단 법적 고지 링크. */
export const LEGAL_NAV: NavItem[] = [
  { href: '/privacy', label: '개인정보처리방침' },
  { href: '/terms', label: '이용약관' },
]

/**
 * 관리자 진입점. 푸터 맨 끝에 눈에 띄지 않게 둔다.
 *
 * 방문자에게 필요한 링크가 아니라 헤더나 주요 메뉴에는 넣지 않는다.
 * 링크가 있어도 `/admin` 은 인증 가드와 RLS 로 막혀 있다.
 */
export const ADMIN_ENTRY: NavItem = { href: '/login', label: '관리자' }
