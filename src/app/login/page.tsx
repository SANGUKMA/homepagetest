import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { LoginForm } from '@/components/login-form'
import { getCurrentUser } from '@/lib/queries/auth'
import { SITE } from '@/lib/content/site'
import { LOGIN } from '@/lib/content/strings'

export const metadata: Metadata = {
  title: LOGIN.title,
  description: LOGIN.description,
  // 관리자 진입점은 색인하지 않는다.
  robots: { index: false, follow: false },
}

/** 관리자 로그인 (PRD FR-7). 이미 로그인했다면 관리자 화면으로 보낸다. */
export default async function LoginPage() {
  const user = await getCurrentUser()

  if (user) {
    redirect('/admin')
  }

  return (
    <main className="flex flex-1 items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-sm font-semibold text-brand">{SITE.name}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight">
            {LOGIN.title}
          </h1>
          <p className="mt-3 text-sm text-muted">{LOGIN.description}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-border p-6">
          <LoginForm />
        </div>

        <p className="mt-6 text-center text-sm">
          <Link href="/" className="text-muted hover:text-foreground">
            {LOGIN.backHome}
          </Link>
        </p>
      </div>
    </main>
  )
}
