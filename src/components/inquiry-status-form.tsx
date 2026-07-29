'use client'

import { useActionState, useState } from 'react'

import {
  changeInquiryStatus,
  type StatusFormState,
} from '@/app/(admin)/admin/inquiries/[id]/actions'
import { buttonClasses } from '@/components/button'
import { inputClasses } from '@/components/form-field'
import { ADMIN, INQUIRY_STATUS_LABELS } from '@/lib/content/strings'
import { INQUIRY_STATUSES, type InquiryStatus } from '@/types/inquiry'

/** 상태 변경 폼 (PRD FR-9). 상태 선택과 진행 표시 때문에 클라이언트 컴포넌트다. */
const INITIAL_STATE: StatusFormState = { status: 'idle' }

type InquiryStatusFormProps = {
  id: string
  current: InquiryStatus
}

export function InquiryStatusForm({ id, current }: InquiryStatusFormProps) {
  const [state, formAction, isPending] = useActionState(
    changeInquiryStatus,
    INITIAL_STATE,
  )
  const [selected, setSelected] = useState<InquiryStatus>(current)

  const unchanged = selected === current

  return (
    <form action={formAction} className="space-y-3">
      <input type="hidden" name="id" value={id} />

      <label htmlFor="status" className="block text-sm font-medium">
        {ADMIN.status.label}
      </label>
      <div className="flex flex-wrap gap-3">
        <select
          id="status"
          name="status"
          value={selected}
          onChange={(event) =>
            setSelected(event.target.value as InquiryStatus)
          }
          className={`${inputClasses} mt-0 w-40`}
        >
          {INQUIRY_STATUSES.map((value) => (
            <option key={value} value={value}>
              {INQUIRY_STATUS_LABELS[value]}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={isPending || unchanged}
          className={buttonClasses('primary', 'md')}
        >
          {isPending ? ADMIN.status.changing : ADMIN.status.change}
        </button>
      </div>

      {state.status === 'error' && state.message ? (
        <p role="alert" className="text-sm text-danger">
          {state.message}
        </p>
      ) : null}
      {state.status === 'success' && state.message ? (
        <p role="status" className="text-sm text-success">
          {state.message}
        </p>
      ) : null}
      {state.status === 'idle' ? (
        <p className="text-xs text-muted">{ADMIN.status.hint}</p>
      ) : null}
    </form>
  )
}
