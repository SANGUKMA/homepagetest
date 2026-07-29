/**
 * 입학 안내 정적 콘텐츠 (PRD FR-3).
 *
 * ⚠️ 일정·요건은 원문 확보 전까지의 플레이스홀더다 (PRD §12.2 Q7).
 *    실제 모집요강이 확정되면 이 파일만 교체한다.
 */

export type AdmissionStep = {
  order: number
  title: string
  description: string
}

export type ScheduleItem = {
  period: string
  title: string
  note?: string
}

export type Scholarship = {
  name: string
  benefit: string
  requirement: string
}

export type AdmissionsContent = {
  title: string
  description: string
  eligibility: string[]
  documents: string[]
  steps: AdmissionStep[]
  schedule: ScheduleItem[]
  scheduleNotice: string
  scholarships: Scholarship[]
  scholarshipNotice: string
}

export const ADMISSIONS: AdmissionsContent = {
  title: '입학 안내',
  description:
    '모집 요강과 전형 절차, 일정을 안내합니다. 개별 상황에 따른 지원 가능 여부는 문의로 확인해 주세요.',
  /** 지원 자격 (모집요강 요약) */
  eligibility: [
    '고등학교 졸업(예정) 또는 법령상 이와 동등한 학력을 갖춘 분',
    '전문대학 졸업(예정)자는 편입학 전형으로 지원 가능',
    '국적 제한 없음 · 한국어로 수업을 이수할 수 있는 어학 능력 필요',
  ],
  documents: [
    '입학지원서 (온라인 작성)',
    '최종 학력 졸업증명서',
    '자기소개서 및 학업계획서',
    '해당자에 한해 경력증명서 · 성적증명서',
  ],
  steps: [
    {
      order: 1,
      title: '온라인 지원',
      description: '모집 기간 중 지원서를 작성하고 서류를 업로드합니다.',
    },
    {
      order: 2,
      title: '서류 심사',
      description: '제출 서류로 지원 자격과 학업계획을 확인합니다.',
    },
    {
      order: 3,
      title: '면접 (해당자)',
      description: '전형에 따라 온라인 면접을 진행할 수 있습니다.',
    },
    {
      order: 4,
      title: '합격 발표',
      description: '개별 이메일과 홈페이지 공지로 결과를 안내합니다.',
    },
    {
      order: 5,
      title: '등록 및 수강 신청',
      description: '등록금 납부 후 학기 시작 전 수강 신청을 진행합니다.',
    },
  ],
  schedule: [
    { period: '11월 ~ 12월', title: '1학기 원서 접수' },
    { period: '12월 중', title: '서류 심사 및 면접', note: '해당자에 한함' },
    { period: '1월 초', title: '합격 발표' },
    { period: '1월 ~ 2월', title: '등록 및 수강 신청' },
    { period: '3월', title: '1학기 개강' },
  ],
  scheduleNotice:
    '위 일정은 예시이며 학기·전형에 따라 달라질 수 있습니다. 확정 일정은 문의로 확인해 주세요.',
  scholarships: [
    {
      name: '신입생 장학',
      benefit: '첫 학기 등록금 일부 감면',
      requirement: '신입학 전형 합격자 중 심사를 거쳐 선발',
    },
    {
      name: '성적 우수 장학',
      benefit: '직전 학기 성적에 따라 차등 감면',
      requirement: '직전 학기 12학점 이상 이수 및 기준 평점 충족',
    },
    {
      name: '재직자 지원 장학',
      benefit: '등록금 분납 및 일부 감면',
      requirement: '재직증명서 제출 및 근속 요건 충족',
    },
  ],
  scholarshipNotice: '장학 제도는 매 학기 운영 여건에 따라 조정될 수 있습니다.',
}
