'use server'

import { revalidatePath } from 'next/cache'

import { ADMIN } from '@/lib/content/strings'
import { updateInquiryStatus } from '@/lib/mutations/inquiries'

/**
 * 문의 상태 변경 (PRD FR-9).
 *
 * 검증과 DB 접근은 `src/lib/mutations/inquiries` 가 한다 (CLAUDE.md §4).
 * DB 쪽은 `authenticated` 에게 `status` 컬럼 update 권한만 주므로, 이 경로로는
 * 다른 컬럼을 바꿀 수 없다.
 */
export type StatusFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function changeInquiryStatus(
  _prevState: StatusFormState,
  formData: FormData,
): Promise<StatusFormState> {
  const id = formData.get('id')
  const status = formData.get('status')

  const result = await updateInquiryStatus({ id, status })

  if (!result.ok) {
    return { status: 'error', message: result.message }
  }

  if (typeof id === 'string') {
    revalidatePath(`/admin/inquiries/${id}`)
  }
  revalidatePath('/admin')

  return { status: 'success', message: ADMIN.status.changed }
}
