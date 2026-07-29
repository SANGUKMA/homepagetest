/**
 * 홈 · 소개 페이지 카피 (PRD FR-1 · §7).
 *
 * ⚠️ 기관명·파트너십 등 사실 관계는 확정 전 플레이스홀더다 (PRD §12.2 Q1·Q7).
 *    확정되면 이 파일의 문자열만 교체한다. 화면 구조는 그대로 쓴다.
 */

export type Feature = {
  title: string
  description: string
}

export type Milestone = {
  year: string
  title: string
  description: string
}

export const HOME = {
  hero: {
    eyebrow: '온라인 학위과정',
    title: '일하면서 완성하는\nAI 학위',
    description:
      '기초부터 산업 적용까지, 재직자가 병행할 수 있도록 설계한 온라인 학위과정입니다. 궁금한 점은 언제든 문의로 남겨 주세요.',
    primaryCta: '입학·과정 문의하기',
    secondaryCta: '학위과정 보기',
  },
  features: {
    title: '이런 점이 다릅니다',
    description: '재직자가 끝까지 이수할 수 있는 조건을 우선해 설계했습니다.',
    items: [
      {
        title: '시간에 매이지 않는 수강',
        description:
          '녹화 강의로 원하는 시간에 학습하고, 실습 세션만 일정에 맞춰 참여합니다.',
      },
      {
        title: '기초부터 쌓는 커리큘럼',
        description:
          '비전공자를 전제로 수학·프로그래밍 기초 과목부터 단계적으로 구성했습니다.',
      },
      {
        title: '실무 과제 중심 평가',
        description:
          '시험 위주가 아니라 실제 데이터를 다루는 과제와 프로젝트로 역량을 확인합니다.',
      },
      {
        title: '이수 속도 조절',
        description:
          '학기당 수강 학점을 조절할 수 있어 업무 상황에 맞춰 일정을 관리할 수 있습니다.',
      },
    ] as Feature[],
  },
  programs: {
    title: '학위과정',
    description: '목표에 따라 학위과정과 단기 수료과정 중에서 선택할 수 있습니다.',
    allLink: '전체 과정 보기',
  },
  admissions: {
    title: '입학 일정',
    description: '연 2회 모집합니다. 아래는 1학기 기준 일정입니다.',
    detailLink: '입학 안내 자세히 보기',
  },
  cta: {
    title: '어떤 과정이 맞을지 고민되시나요?',
    description:
      '학력·경력 상황을 알려 주시면 지원 가능한 전형과 과정을 안내드립니다.',
    button: '입학·과정 문의하기',
  },
} as const

export const ABOUT = {
  title: '대학 소개',
  description:
    '온라인으로 학위를 마칠 수 있는 환경을 만드는 것을 목표로 합니다.',
  mission: {
    title: '우리가 하려는 것',
    body: [
      '일과 학업을 병행하려는 학습자에게 가장 큰 장벽은 시간과 거리입니다. 온라인으로 전 과정을 이수할 수 있게 만들어 이 장벽을 낮추는 것이 우리의 출발점입니다.',
      '기술 변화가 빠른 분야일수록 현장에서 쓰이는 내용을 가르쳐야 한다고 봅니다. 커리큘럼은 산업 현장의 요구를 반영해 주기적으로 개편합니다.',
    ],
  },
  partnership: {
    title: '파트너십',
    description:
      '국내외 교육·산업 기관과 협력해 커리큘럼을 설계하고 운영합니다. 구체적인 협력 기관과 범위는 확정되는 대로 안내드립니다.',
    items: [
      {
        title: '교육과정 공동 설계',
        description: '파트너 기관과 함께 교과목과 평가 기준을 설계합니다.',
      },
      {
        title: '산업 연계 프로젝트',
        description: '실제 기업 과제를 졸업 프로젝트 주제로 연결합니다.',
      },
      {
        title: '학점 교류',
        description: '협력 기관의 일부 과목을 학점으로 인정합니다.',
      },
    ] as Feature[],
  },
  vision: {
    title: '앞으로',
    items: [
      {
        year: '1단계',
        title: '학위과정 운영 안정화',
        description: '온라인 학위과정과 단기 수료과정을 운영합니다.',
      },
      {
        year: '2단계',
        title: '학습 관리 환경 구축',
        description:
          '수강 신청과 학습 이력을 한곳에서 관리하는 환경을 준비합니다.',
      },
      {
        year: '3단계',
        title: '과정 확대',
        description: '수요가 확인된 분야로 전공과 과정을 넓혀 갑니다.',
      },
    ] as Milestone[],
  },
  location: {
    title: '오시는 길',
    description:
      '수업은 전 과정 온라인으로 진행됩니다. 상담과 행정 업무는 아래 사무실에서 담당합니다.',
    addressLabel: '주소',
    hoursLabel: '운영 시간',
    contactLabel: '연락처',
  },
} as const
