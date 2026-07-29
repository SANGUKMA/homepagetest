/**
 * 자주 묻는 질문 (PRD FR-11).
 *
 * 반복 문의를 줄이는 것이 목적이므로, 실제 접수되는 문의를 보고 계속 보강한다.
 *
 * ⚠️ 초기 항목은 플레이스홀더다 (PRD §12.2 Q7).
 */

export type FaqCategory = '입학' | '수업' | '학위·학점' | '등록금'

export type FaqItem = {
  category: FaqCategory
  question: string
  answer: string
}

export const FAQ_CATEGORIES: FaqCategory[] = [
  '입학',
  '수업',
  '학위·학점',
  '등록금',
]

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: '입학',
    question: '전공을 바꾸려는 비전공자도 지원할 수 있나요?',
    answer:
      '가능합니다. 1학년 과목이 프로그래밍과 수학 기초부터 시작하도록 설계돼 있어 사전 지식이 없어도 이수할 수 있습니다. 다만 학습 시간 확보는 필요합니다.',
  },
  {
    category: '입학',
    question: '지원 자격에 나이 제한이 있나요?',
    answer:
      '나이 제한은 없습니다. 고등학교 졸업 또는 법령상 동등한 학력 요건만 충족하면 지원할 수 있습니다.',
  },
  {
    category: '입학',
    question: '전문대 졸업자인데 편입할 수 있나요?',
    answer:
      '편입학 전형으로 지원할 수 있습니다. 인정 학점은 이전 학교의 이수 내역에 따라 달라지므로 문의를 남겨 주시면 개별 안내드립니다.',
  },
  {
    category: '수업',
    question: '수업은 실시간으로 진행되나요?',
    answer:
      '기본 강의는 녹화본으로 제공되어 원하는 시간에 수강할 수 있습니다. 실습 세션과 프로젝트 리뷰는 일정에 맞춰 온라인으로 진행합니다.',
  },
  {
    category: '수업',
    question: '직장과 병행할 수 있나요?',
    answer:
      '재직자 수강을 전제로 설계된 과정입니다. 학기당 이수 학점을 조절할 수 있어 일정에 맞춰 속도를 정할 수 있습니다.',
  },
  {
    category: '수업',
    question: '오프라인 출석이 필요한 일정이 있나요?',
    answer:
      '정규 수업은 전부 온라인으로 진행합니다. 학위수여식 등 일부 행사만 오프라인으로 열리며 참석은 선택입니다.',
  },
  {
    category: '학위·학점',
    question: '졸업하면 어떤 학위를 받나요?',
    answer:
      '과정별로 다릅니다. 학위과정은 해당 전공의 학사 학위가, 수료과정은 수료증이 발급됩니다. 과정 상세 페이지에서 확인하실 수 있습니다.',
  },
  {
    category: '학위·학점',
    question: '수료과정에서 들은 학점을 학위과정에서 인정받을 수 있나요?',
    answer:
      '데이터사이언스 수료과정의 이수 학점은 학위과정 진학 시 인정됩니다. 인정 범위는 진학하는 과정에 따라 달라집니다.',
  },
  {
    category: '등록금',
    question: '등록금은 어떻게 납부하나요?',
    answer:
      '학기 단위로 납부하며 분납 신청이 가능합니다. 구체적인 금액과 납부 일정은 모집 요강에 안내됩니다.',
  },
  {
    category: '등록금',
    question: '장학금은 어떻게 신청하나요?',
    answer:
      '신입생 장학은 별도 신청 없이 합격자를 대상으로 심사합니다. 성적 우수·재직자 지원 장학은 매 학기 신청 기간에 접수합니다.',
  },
]

export function listFaqByCategory(category: FaqCategory): FaqItem[] {
  return FAQ_ITEMS.filter((item) => item.category === category)
}
