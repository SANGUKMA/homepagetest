/**
 * 공용 UI 문자열.
 *
 * 버튼·라벨·안내·에러 문구는 화면에 하드코딩하지 않고 여기서 가져다 쓴다
 * (CLAUDE.md §6 · PRD FR-14).
 */

import type { InquiryType } from '@/types/inquiry'

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
