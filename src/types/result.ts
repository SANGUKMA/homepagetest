/**
 * 쓰기 작업의 반환 타입.
 *
 * CLAUDE.md §7 — 에러는 삼키지 않는다. 원인은 서버 로그로 남기고,
 * 여기 담기는 `message`는 사용자에게 그대로 보여줄 한국어 문구다.
 */

export type FieldErrors = Partial<Record<string, string[]>>

export type ActionResult<T = undefined> =
  | { ok: true; data: T }
  | { ok: false; message: string; fieldErrors?: FieldErrors }
