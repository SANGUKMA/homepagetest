import { z } from 'zod'

/**
 * 로그인 입력 스키마 (PRD FR-7).
 *
 * 에러 메시지는 화면에 그대로 나가므로 한국어로 쓴다 (CLAUDE.md §6).
 * 비밀번호는 길이만 확인한다 — 형식 규칙은 Supabase Auth 가 관리한다.
 */
export const loginSchema = z.object({
  email: z
    .email({ error: '올바른 이메일 주소를 입력해 주세요.' })
    .trim()
    .max(254, '이메일 주소가 너무 깁니다.'),

  password: z
    .string({ error: '비밀번호를 입력해 주세요.' })
    .min(1, '비밀번호를 입력해 주세요.')
    .max(72, '비밀번호가 너무 깁니다.'),
})

export type LoginInput = z.infer<typeof loginSchema>
