import type { Metadata } from 'next'

import { LegalDocument } from '@/components/legal-document'
import { TERMS_OF_SERVICE } from '@/lib/content/legal'

export const metadata: Metadata = {
  title: TERMS_OF_SERVICE.title,
  description: TERMS_OF_SERVICE.description,
}

/** 이용약관 (PRD FR-15). */
export default function TermsPage() {
  return <LegalDocument document={TERMS_OF_SERVICE} />
}
