/**
 * 학위과정 정적 콘텐츠 (PRD FR-2).
 *
 * M0 결정에 따라 Phase 1 의 과정 정보는 DB 가 아니라 코드로 관리한다.
 * `programs` 테이블은 만들지 않는다 — LMS 도메인은 Phase 2 범위다
 * (CLAUDE.md §1 · 설계 문서 §05).
 *
 * ⚠️ 카피는 원문 확보 전까지의 플레이스홀더다 (PRD §12.2 Q7).
 */

export type CurriculumTerm = {
  /** 예: '1학년 1학기' */
  term: string
  subjects: string[]
}

export type Program = {
  /** URL 조각. `/programs/[slug]` 와 문의 폼의 `program_slug` 에 함께 쓴다. */
  slug: string
  name: string
  tagline: string
  summary: string
  /** 취득 학위 또는 이수 증명 */
  degree: string
  duration: string
  credits: string
  /** 수업 방식 */
  format: string
  audience: string[]
  highlights: string[]
  curriculum: CurriculumTerm[]
  careers: string[]
}

export const PROGRAMS: Program[] = [
  {
    slug: 'ai-convergence',
    name: 'AI융합 학사과정',
    tagline: '전공 지식 위에 AI를 얹는 4년제 학위과정',
    summary:
      '인공지능의 기초 이론부터 산업 적용까지 단계적으로 다룹니다. 비전공자도 기초 과목부터 시작해 졸업 프로젝트로 마무리할 수 있도록 구성했습니다.',
    degree: '공학사(AI융합)',
    duration: '4년 (최소 이수 기간 기준)',
    credits: '130학점',
    format: '온라인 강의 + 학기별 온라인 실습 세션',
    audience: [
      '고등학교 졸업 이상 학력을 갖춘 분',
      'AI 분야로 전환을 준비하는 직장인',
      '전공 지식에 데이터·AI 역량을 더하려는 실무자',
    ],
    highlights: [
      '기초 수학·프로그래밍부터 시작하는 단계별 커리큘럼',
      '학기마다 실무 과제 기반 프로젝트 수행',
      '녹화 강의로 시간대에 구애받지 않는 수강',
    ],
    curriculum: [
      {
        term: '1학년',
        subjects: ['프로그래밍 입문', '선형대수 기초', '통계학 개론', '컴퓨터 시스템'],
      },
      {
        term: '2학년',
        subjects: ['자료구조', '데이터베이스', '머신러닝 기초', '데이터 시각화'],
      },
      {
        term: '3학년',
        subjects: ['딥러닝', '자연어처리', '컴퓨터비전', 'AI 윤리와 법'],
      },
      {
        term: '4학년',
        subjects: ['MLOps', '산업별 AI 응용', '졸업 프로젝트 I', '졸업 프로젝트 II'],
      },
    ],
    careers: ['AI 엔지니어', '데이터 분석가', '기획·현업 부서의 AI 담당자'],
  },
  {
    slug: 'ai-business',
    name: 'AI경영 학사과정',
    tagline: '기술을 아는 기획자를 위한 경영 · AI 융합 학위',
    summary:
      '경영학 기초 위에 데이터 기반 의사결정과 AI 도입 전략을 더합니다. 모델을 직접 만들기보다 조직에 적용하는 관점을 다룹니다.',
    degree: '경영학사(AI경영)',
    duration: '4년 (최소 이수 기간 기준)',
    credits: '130학점',
    format: '온라인 강의 + 사례 중심 토론 세션',
    audience: [
      '기획·마케팅·운영 직군의 실무자',
      'AI 도입을 검토 중인 소규모 조직의 관리자',
      '경영 지식과 데이터 역량을 함께 갖추려는 분',
    ],
    highlights: [
      '실제 도입 사례를 분석하는 케이스 스터디 중심',
      '데이터 리터러시와 재무·조직 관리 과목을 함께 이수',
      '비전공자를 전제로 한 기술 과목 설계',
    ],
    curriculum: [
      {
        term: '1학년',
        subjects: ['경영학원론', '회계원리', '데이터 리터러시', '비즈니스 통계'],
      },
      {
        term: '2학년',
        subjects: ['마케팅관리', '조직행동론', '데이터 분석 실무', '서비스 기획'],
      },
      {
        term: '3학년',
        subjects: ['AI 비즈니스 모델', '디지털 전환 전략', '재무관리', 'AI 윤리와 법'],
      },
      {
        term: '4학년',
        subjects: ['AI 프로젝트 관리', '데이터 기반 의사결정', '졸업 프로젝트'],
      },
    ],
    careers: ['서비스·프로덕트 기획자', 'AI 도입 담당자', '데이터 기반 마케터'],
  },
  {
    slug: 'data-science-cert',
    name: '데이터사이언스 수료과정',
    tagline: '한 학기로 압축한 실무 데이터 분석 과정',
    summary:
      '학위 과정 진학 전에 적성을 확인하거나, 실무에 바로 쓸 분석 역량만 빠르게 채우려는 분을 위한 단기 과정입니다.',
    degree: '수료증 (학위 아님)',
    duration: '16주',
    credits: '15학점 (학위과정 진학 시 학점 인정)',
    format: '온라인 강의 + 주 1회 실습 리뷰',
    audience: [
      '데이터 분석 업무를 막 맡게 된 실무자',
      '학위과정 진학 전 적성을 확인하려는 분',
      '재직 중이라 장기 과정이 부담스러운 분',
    ],
    highlights: [
      '학위과정 진학 시 이수 학점 인정',
      '실제 데이터셋으로 진행하는 4개 실습 과제',
      '수료 후 학위과정 편입 상담 제공',
    ],
    curriculum: [
      {
        term: '1~4주',
        subjects: ['파이썬 기초', '데이터 수집과 정제'],
      },
      {
        term: '5~10주',
        subjects: ['탐색적 데이터 분석', '통계적 추론', '데이터 시각화'],
      },
      {
        term: '11~16주',
        subjects: ['머신러닝 입문', '분석 리포팅', '최종 프로젝트'],
      },
    ],
    careers: ['주니어 데이터 분석가', '현업 데이터 담당자'],
  },
]

export function listPrograms(): Program[] {
  return PROGRAMS
}

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find((program) => program.slug === slug)
}
