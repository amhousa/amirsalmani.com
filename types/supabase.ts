export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          email: string | null
          phone: string | null
          address: string | null
          job_title: string | null
          bio: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          job_title?: string | null
          bio?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          email?: string | null
          phone?: string | null
          address?: string | null
          job_title?: string | null
          bio?: string | null
          avatar_url?: string | null
        }
      }
      consultations: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          date: string
          time: string
          duration: number
          type: string
          status: string
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          date: string
          time: string
          duration: number
          type: string
          status: string
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          date?: string
          time?: string
          duration?: number
          type?: string
          status?: string
          notes?: string | null
        }
      }
      services: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          start_date: string
          end_date: string
          duration: number
          status: string
          price: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          start_date: string
          end_date: string
          duration: number
          status: string
          price: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          start_date?: string
          end_date?: string
          duration?: number
          status?: string
          price?: number
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          amount: number
          currency: string
          status: string
          payment_method: string
          transaction_id: string
          description: string
          date: string
          related_id: string | null
          related_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          amount: number
          currency: string
          status: string
          payment_method: string
          transaction_id: string
          description: string
          date: string
          related_id?: string | null
          related_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          amount?: number
          currency?: string
          status?: string
          payment_method?: string
          transaction_id?: string
          description?: string
          date?: string
          related_id?: string | null
          related_type?: string | null
        }
      }
      orders: {
        Row: {
          id: string
          created_at: string
          user_id: string
          status: string
          total_amount: number
          payment_status: string
          payment_method: string | null
          items: Json
          shipping_address: Json | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          status: string
          total_amount: number
          payment_status: string
          payment_method?: string | null
          items: Json
          shipping_address?: Json | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          status?: string
          total_amount?: number
          payment_status?: string
          payment_method?: string | null
          items?: Json
          shipping_address?: Json | null
          notes?: string | null
        }
      }
      meetings: {
        Row: {
          id: string
          created_at: string
          user_id: string
          title: string
          description: string | null
          meeting_date: string
          duration: number
          status: string
          meeting_link: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          title: string
          description?: string | null
          meeting_date: string
          duration: number
          status: string
          meeting_link?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          title?: string
          description?: string | null
          meeting_date?: string
          duration?: number
          status?: string
          meeting_link?: string | null
          notes?: string | null
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
  }
}

