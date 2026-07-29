import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { PRIVACY_POLICY } from '@/lib/content/legal'

export const metadata: Metadata = {
  title: PRIVACY_POLICY.title,
  description: PRIVACY_POLICY.description,
}

/** 개인정보처리방침 — 문의 폼 동의의 근거 문서 (PRD FR-6). */
export default function PrivacyPage() {
  return <LegalDocument document={PRIVACY_POLICY} />
}
