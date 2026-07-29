import Link from 'next/link'

import { buttonClasses } from '@/components/button'
import { inputClasses } from '@/components/form-field'
import { ADMIN, INQUIRY_STATUS_LABELS } from '@/lib/content/strings'
import { INQUIRY_STATUSES, type InquiryStatus } from '@/types/inquiry'

/**
 * 문의 목록 필터 (PRD FR-8).
 *
 * 평범한 GET 폼이라 자바스크립트 없이 동작하고, 필터 상태가 URL 에 남아
 * 공유·새로고침에도 유지된다.
 */
type InquiryFiltersProps = {
  status?: InquiryStatus
  from?: string
  to?: string
}

export function InquiryFilters({ status, from, to }: InquiryFiltersProps) {
  return (
    <form
      method="get"
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-border p-4"
    >
      <div>
        <label htmlFor="status" className="block text-xs font-medium text-muted">
          {ADMIN.filters.status}
        </label>
        <select
          id="status"
          name="status"
          defaultValue={status ?? ''}
          className={`${inputClasses} w-36`}
        >
          <option value="">{ADMIN.filters.statusAll}</option>
          {INQUIRY_STATUSES.map((value) => (
            <option key={value} value={value}>
              {INQUIRY_STATUS_LABELS[value]}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="from" className="block text-xs font-medium text-muted">
          {ADMIN.filters.from}
        </label>
        <input
          id="from"
          name="from"
          type="date"
          defaultValue={from ?? ''}
          className={`${inputClasses} w-44`}
        />
      </div>

      <div>
        <label htmlFor="to" className="block text-xs font-medium text-muted">
          {ADMIN.filters.to}
        </label>
        <input
          id="to"
          name="to"
          type="date"
          defaultValue={to ?? ''}
          className={`${inputClasses} w-44`}
        />
      </div>

      <button type="submit" className={buttonClasses('primary', 'md')}>
        {ADMIN.filters.apply}
      </button>
      <Link href="/admin" className={buttonClasses('secondary', 'md')}>
        {ADMIN.filters.reset}
      </Link>

      <p className="w-full text-xs text-muted">{ADMIN.filters.dateHint}</p>
    </form>
  )
}
