import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'

import { AdminHeader } from '@/components/admin-header'
import { getCurrentUser } from '@/lib/queries/auth'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

/**
 * 관리자 영역 인증 가드 (PRD FR-7 · 설계 문서 §01).
 *
 * **실제 차단은 여기서 한다.** 미들웨어는 쿠키만 보고 판단하므로 접근 제어를
 * 맡기지 않고, 여기서 `getUser()` 로 토큰을 검증한다. 데이터 자체도 RLS 로
 * 한 번 더 막혀 있어, 이 가드가 뚫려도 익명 사용자는 문의를 읽을 수 없다.
 */
export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <AdminHeader email={user.email} />
      <main className="flex-1">{children}</main>
    </>
  )
}
