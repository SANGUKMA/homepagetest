'use server'

import { redirect } from 'next/navigation'

import { signOut } from '@/lib/mutations/auth'

/**
 * 로그아웃 (PRD FR-7).
 *
 * 실패해도 로그인 화면으로 보낸다. 세션이 남아 있으면 로그인 화면이 다시
 * 관리자 화면으로 돌려보내므로 사용자가 갇히지 않는다. 원인은 로그로 남는다.
 */
export async function signOutAction(): Promise<void> {
  await signOut()
  redirect('/login')
}
