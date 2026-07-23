/**
 * Supabase `Database` 타입.
 *
 * ⚠️ 이 파일은 생성물이다. 손으로 고치지 않는다 (CLAUDE.md §4).
 *
 * 현재 내용은 Supabase 프로젝트가 아직 없는 상태에서 M1 을 진행하기 위한
 * 부트스트랩이며, `supabase/migrations/20260723000000_create_inquiries.sql` 을
 * 그대로 반영한 것이다. 프로젝트가 준비되면 아래 명령으로 **덮어써서** 교체한다.
 *
 *   npx supabase gen types typescript --project-id <PROJECT_ID> > src/lib/supabase/database.types.ts
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      inquiries: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          phone: string | null
          inquiry_type: string
          program_slug: string | null
          message: string
          privacy_consent: boolean
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          phone?: string | null
          inquiry_type: string
          program_slug?: string | null
          message: string
          privacy_consent: boolean
          status?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          phone?: string | null
          inquiry_type?: string
          program_slug?: string | null
          message?: string
          privacy_consent?: boolean
          status?: string
        }
        Relationships: []
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}
