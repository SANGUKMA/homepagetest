import Link from 'next/link'

import { InquiryFilters } from '@/components/inquiry-filters'
import { InquiryStatusBadge } from '@/components/inquiry-status-badge'
import { getProgram } from '@/lib/content/programs'
import { ADMIN, INQUIRY_TYPE_LABELS } from '@/lib/content/strings'
import { formatDateTime } from '@/lib/format'
import { listInquiries } from '@/lib/queries/inquiries'
import { INQUIRY_STATUSES, type InquiryStatus } from '@/types/inquiry'

const PAGE_SIZE = 20
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/

type PageProps = {
  searchParams: Promise<{
    status?: string
    from?: string
    to?: string
    page?: string
  }>
}

/**
 * 문의 목록 (PRD FR-8). 최신순 · 상태·기간 필터.
 *
 * 쿼리 문자열은 사용자가 손댈 수 있으므로 알려진 값만 통과시킨다. 잘못된 값은
 * 오류를 내지 않고 무시한다 — 필터가 틀렸다고 목록 전체를 막을 이유는 없다.
 */
export default async function AdminInquiriesPage({ searchParams }: PageProps) {
  const params = await searchParams

  const status = (INQUIRY_STATUSES as readonly string[]).includes(
    params.status ?? '',
  )
    ? (params.status as InquiryStatus)
    : undefined
  const from = DATE_PATTERN.test(params.from ?? '') ? params.from : undefined
  const to = DATE_PATTERN.test(params.to ?? '') ? params.to : undefined

  const parsedPage = Number(params.page)
  const page =
    Number.isInteger(parsedPage) && parsedPage >= 1 ? parsedPage : 1

  const { inquiries, total } = await listInquiries({
    status,
    from,
    to,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  })

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const pageHref = (target: number) => {
    const query = new URLSearchParams()
    if (status) query.set('status', status)
    if (from) query.set('from', from)
    if (to) query.set('to', to)
    if (target > 1) query.set('page', String(target))
    const search = query.toString()
    return search ? `/admin?${search}` : '/admin'
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink">
          {ADMIN.list.title}
        </h1>
        <p className="text-sm text-muted">{ADMIN.list.total(total)}</p>
      </div>

      <div className="mt-6">
        <InquiryFilters status={status} from={from} to={to} />
      </div>

      {inquiries.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-border px-6 py-16 text-center text-sm text-muted">
          {ADMIN.list.empty}
        </p>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs text-muted">
                <th scope="col" className="py-3 pr-4 font-medium">
                  {ADMIN.list.columns.createdAt}
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  {ADMIN.list.columns.name}
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  {ADMIN.list.columns.inquiryType}
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  {ADMIN.list.columns.program}
                </th>
                <th scope="col" className="py-3 pr-4 font-medium">
                  {ADMIN.list.columns.status}
                </th>
                <th scope="col" className="py-3 font-medium">
                  <span className="sr-only">{ADMIN.list.detailLink}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id} className="border-b border-border">
                  <td className="py-4 pr-4 align-top whitespace-nowrap text-muted">
                    {formatDateTime(inquiry.createdAt)}
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <span className="font-medium">{inquiry.name}</span>
                    <span className="mt-0.5 block text-xs text-muted">
                      {inquiry.email}
                    </span>
                  </td>
                  <td className="py-4 pr-4 align-top">
                    {INQUIRY_TYPE_LABELS[inquiry.inquiryType]}
                  </td>
                  <td className="py-4 pr-4 align-top text-muted">
                    {inquiry.programSlug
                      ? (getProgram(inquiry.programSlug)?.name ??
                        inquiry.programSlug)
                      : '—'}
                  </td>
                  <td className="py-4 pr-4 align-top">
                    <InquiryStatusBadge status={inquiry.status} />
                  </td>
                  <td className="py-4 align-top text-right">
                    <Link
                      href={`/admin/inquiries/${inquiry.id}`}
                      className="font-semibold text-brand hover:underline"
                    >
                      {ADMIN.list.detailLink}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 ? (
        <nav
          aria-label="페이지 이동"
          className="mt-8 flex items-center justify-center gap-4 text-sm"
        >
          {page > 1 ? (
            <Link href={pageHref(page - 1)} className="text-brand hover:underline">
              {ADMIN.pagination.previous}
            </Link>
          ) : (
            <span className="text-muted">{ADMIN.pagination.previous}</span>
          )}
          <span className="text-muted">
            {ADMIN.pagination.current(page, totalPages)}
          </span>
          {page < totalPages ? (
            <Link href={pageHref(page + 1)} className="text-brand hover:underline">
              {ADMIN.pagination.next}
            </Link>
          ) : (
            <span className="text-muted">{ADMIN.pagination.next}</span>
          )}
        </nav>
      ) : null}
    </div>
  )
}
