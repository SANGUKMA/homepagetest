import type { Database } from '@/lib/supabase/database.types'
import { createSupabaseServerClient } from '@/lib/supabase/server'
import {
  inquiryIdSchema,
  listInquiriesFilterSchema,
} from '@/lib/validators/inquiry'
import {
  INQUIRY_STATUSES,
  INQUIRY_TYPES,
  type Inquiry,
  type InquiryStatus,
  type InquiryType,
} from '@/types/inquiry'

/**
 * 문의 읽기.
 *
 * RLS 상 `select` 는 인증된 관리자에게만 허용된다. 비인증 상태에서 호출하면
 * 행이 하나도 오지 않으므로, 호출부(M3 관리자 영역)는 인증 가드 뒤에 둔다.
 */

type InquiryRow = Database['public']['Tables']['inquiries']['Row']

/** 한국 시간대. 관리자가 고르는 날짜는 KST 기준이다. */
const KST_OFFSET = '+09:00'

function toInquiryType(value: string): InquiryType {
  return (INQUIRY_TYPES as readonly string[]).includes(value)
    ? (value as InquiryType)
    : 'other'
}

function toInquiryStatus(value: string): InquiryStatus {
  return (INQUIRY_STATUSES as readonly string[]).includes(value)
    ? (value as InquiryStatus)
    : 'new'
}

/** DB 행을 도메인 타입으로 옮긴다. 컬럼명은 이 경계 밖으로 나가지 않는다. */
function toInquiry(row: InquiryRow): Inquiry {
  return {
    id: row.id,
    createdAt: row.created_at,
    name: row.name,
    email: row.email,
    phone: row.phone,
    inquiryType: toInquiryType(row.inquiry_type),
    programSlug: row.program_slug,
    privacyConsent: row.privacy_consent,
    message: row.message,
    status: toInquiryStatus(row.status),
  }
}

export type ListInquiriesResult = {
  inquiries: Inquiry[]
  /** 필터 조건에 맞는 전체 건수. 페이지네이션에 쓴다. */
  total: number
}

export async function listInquiries(input: unknown = {}): Promise<ListInquiriesResult> {
  const filter = listInquiriesFilterSchema.parse(input)
  const supabase = await createSupabaseServerClient()

  let query = supabase
    .from('inquiries')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (filter.status) {
    query = query.eq('status', filter.status)
  }
  if (filter.from) {
    query = query.gte('created_at', `${filter.from}T00:00:00${KST_OFFSET}`)
  }
  if (filter.to) {
    query = query.lte('created_at', `${filter.to}T23:59:59.999${KST_OFFSET}`)
  }

  const { data, error, count } = await query.range(
    filter.offset,
    filter.offset + filter.limit - 1,
  )

  if (error) {
    console.error('[queries/inquiries] listInquiries failed', error)
    throw new Error('문의 목록을 불러오지 못했습니다.')
  }

  return {
    inquiries: data.map(toInquiry),
    total: count ?? data.length,
  }
}

export async function getInquiry(id: unknown): Promise<Inquiry | null> {
  const inquiryId = inquiryIdSchema.parse(id)
  const supabase = await createSupabaseServerClient()

  const { data, error } = await supabase
    .from('inquiries')
    .select('*')
    .eq('id', inquiryId)
    .maybeSingle()

  if (error) {
    console.error('[queries/inquiries] getInquiry failed', error)
    throw new Error('문의 내용을 불러오지 못했습니다.')
  }

  return data ? toInquiry(data) : null
}
