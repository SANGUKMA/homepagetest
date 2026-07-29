import { INQUIRY_STATUS_LABELS } from '@/lib/content/strings'
import type { InquiryStatus } from '@/types/inquiry'

/** 문의 처리 상태 배지. 색만으로 구분하지 않도록 라벨을 함께 보여준다. */
const STYLES: Record<InquiryStatus, string> = {
  new: 'bg-brand-surface text-brand',
  in_progress: 'bg-warning-surface text-warning',
  done: 'bg-success-surface text-success',
}

export function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${STYLES[status]}`}
    >
      {INQUIRY_STATUS_LABELS[status]}
    </span>
  )
}
