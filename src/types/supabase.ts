export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          date: string
          location: string
          created_by: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          date: string
          location: string
          created_by: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          date?: string
          location?: string
          created_by?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      guests: {
        Row: {
          id: string
          event_id: string | null
          rsvp_status: string | null
          dietary_preferences: string | null
          accessibility_needs: string | null
          attendee_count: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          event_id?: string | null
          rsvp_status?: string | null
          dietary_preferences?: string | null
          accessibility_needs?: string | null
          attendee_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string | null
          rsvp_status?: string | null
          dietary_preferences?: string | null
          accessibility_needs?: string | null
          attendee_count?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      tasks: {
        Row: {
          id: string
          event_id: string | null
          title: string
          completed: boolean | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          event_id?: string | null
          title: string
          completed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          event_id?: string | null
          title?: string
          completed?: boolean | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type Enums<T extends keyof Database['public']['Enums']> = Database['public']['Enums'][T]