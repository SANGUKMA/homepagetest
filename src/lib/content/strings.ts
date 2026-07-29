/**
 * 공용 UI 문자열.
 *
 * 버튼·라벨·안내·에러 문구는 화면에 하드코딩하지 않고 여기서 가져다 쓴다
 * (CLAUDE.md §6 · PRD FR-14).
 */

import type { InquiryStatus, InquiryType } from '@/types/inquiry'

/** 저장 값(영어 코드) → 화면 라벨(한국어). DB 에는 코드가 들어간다. */
export const INQUIRY_TYPE_LABELS: Record<InquiryType, string> = {
  admission: '입학 문의',
  program: '과정 문의',
  other: '기타 문의',
}

export const COMMON = {
  inquiryCta: '문의하기',
  inquiryCtaLong: '입학·과정 문의하기',
  learnMore: '자세히 보기',
  viewPrograms: '학위과정 보기',
  viewAdmissions: '입학 안내 보기',
  skipToContent: '본문 바로가기',
  home: '홈',
  loading: '불러오는 중입니다…',
} as const

/** 문의 폼 (PRD FR-4·FR-6). 검증 실패 문구는 zod 스키마 쪽에 있다. */
export const INQUIRY_FORM = {
  title: '입학·과정 문의',
  description:
    '궁금한 점을 남겨 주시면 담당자가 확인 후 영업일 기준 1~2일 안에 회신드립니다.',
  labels: {
    name: '이름',
    email: '이메일',
    phone: '연락처',
    inquiryType: '문의 유형',
    programSlug: '관심 과정',
    message: '문의 내용',
    privacyConsent: '개인정보 수집·이용에 동의합니다.',
  },
  placeholders: {
    name: '홍길동',
    email: 'name@example.com',
    phone: '010-0000-0000',
    message: '궁금한 점을 자세히 적어 주시면 더 정확히 안내드릴 수 있습니다.',
  },
  hints: {
    phone: '선택 입력입니다. 회신은 이메일로도 드립니다.',
    programSlug: '해당하는 과정이 없으면 비워 두셔도 됩니다.',
    required: '* 표시는 필수 입력입니다.',
  },
  programPlaceholder: '선택 안 함',
  privacyDetail: {
    prefix: '수집 항목·목적·보유 기간은 ',
    linkLabel: '개인정보처리방침',
    suffix: '에서 확인하실 수 있습니다.',
  },
  submit: '문의 보내기',
  submitting: '보내는 중…',
  /** 서버 액션이 반환하는 사용자 노출 문구 (CLAUDE.md §7 — 에러는 삼키지 않는다). */
  errors: {
    generic: '문의를 접수하지 못했습니다. 잠시 후 다시 시도해 주세요.',
    invalid: '입력값을 다시 확인해 주세요.',
    spam: '요청을 처리할 수 없습니다. 잠시 후 다시 시도해 주세요.',
    turnstile: '자동 가입 방지 확인에 실패했습니다. 다시 시도해 주세요.',
  },
} as const

export const INQUIRY_COMPLETE = {
  title: '문의가 접수되었습니다',
  description:
    '남겨 주신 연락처로 담당자가 회신드립니다. 영업일 기준 1~2일이 걸릴 수 있습니다.',
  notice: '회신이 늦어지면 대표 이메일로 다시 문의해 주세요.',
  backHome: '홈으로',
  viewPrograms: '학위과정 둘러보기',
} as const

/** 관리자 로그인 (PRD FR-7). */
export const LOGIN = {
  title: '관리자 로그인',
  description: '문의 관리 화면은 관리자만 이용할 수 있습니다.',
  labels: {
    email: '이메일',
    password: '비밀번호',
  },
  placeholders: {
    email: 'admin@example.com',
  },
  submit: '로그인',
  submitting: '확인 중…',
  backHome: '홈으로 돌아가기',
} as const

/** 관리자 영역 (PRD FR-8 · FR-9). */
export const ADMIN = {
  title: '문의 관리',
  navLabel: '관리자 메뉴',
  signOut: '로그아웃',
  viewSite: '사이트 보기',
  list: {
    title: '문의 목록',
    empty: '조건에 맞는 문의가 없습니다.',
    total: (count: number) => `전체 ${count}건`,
    columns: {
      createdAt: '접수일',
      name: '이름',
      inquiryType: '유형',
      program: '관심 과정',
      status: '상태',
    },
    detailLink: '상세',
  },
  filters: {
    title: '필터',
    status: '상태',
    statusAll: '전체',
    from: '시작일',
    to: '종료일',
    apply: '적용',
    reset: '초기화',
    dateHint: '접수일 기준 (한국 시간)',
  },
  pagination: {
    previous: '이전',
    next: '다음',
    current: (page: number, totalPages: number) => `${page} / ${totalPages}`,
  },
  detail: {
    title: '문의 상세',
    back: '목록으로',
    contact: '연락처 정보',
    content: '문의 내용',
    meta: '접수 정보',
    consent: '개인정보 수집·이용 동의',
    consentGiven: '동의함',
    noPhone: '미입력',
    noProgram: '선택 안 함',
    notFound: '해당 문의를 찾을 수 없습니다.',
  },
  status: {
    label: '처리 상태',
    change: '상태 변경',
    changing: '변경 중…',
    changed: '상태를 변경했습니다.',
    hint: '변경 내용은 즉시 저장됩니다.',
  },
} as const

/** 저장 값 → 화면 라벨. DB 에는 영어 코드가 들어간다. */
export const INQUIRY_STATUS_LABELS: Record<InquiryStatus, string> = {
  new: '신규',
  in_progress: '진행중',
  done: '완료',
}

export const NOT_FOUND = {
  title: '페이지를 찾을 수 없습니다',
  description: '주소가 바뀌었거나 삭제된 페이지입니다.',
  backHome: '홈으로 돌아가기',
} as const

export const ERROR_PAGE = {
  title: '문제가 발생했습니다',
  description:
    '일시적인 오류로 페이지를 표시하지 못했습니다. 잠시 후 다시 시도해 주세요.',
  retry: '다시 시도',
} as const
