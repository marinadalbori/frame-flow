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
      users: {
        Row: {
          id: string
          email: string
          role: 'supplier' | 'installer' | 'client'
          full_name: string
          company_name: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'supplier' | 'installer' | 'client'
          full_name: string
          company_name?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'supplier' | 'installer' | 'client'
          full_name?: string
          company_name?: string | null
          updated_at?: string
        }
      }
      suppliers: {
        Row: {
          id: string
          user_id: string
          company_details: Json
          settings: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          company_details?: Json
          settings?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          company_details?: Json
          settings?: Json
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          supplier_id: string
          name: string
          description: string
          category: string
          specifications: Json
          price: number
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          supplier_id: string
          name: string
          description: string
          category: string
          specifications?: Json
          price: number
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          supplier_id?: string
          name?: string
          description?: string
          category?: string
          specifications?: Json
          price?: number
          active?: boolean
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          supplier_id: string
          name: string
          type: string
          specifications: Json
          price_per_unit: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          supplier_id: string
          name: string
          type: string
          specifications?: Json
          price_per_unit: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          supplier_id?: string
          name?: string
          type?: string
          specifications?: Json
          price_per_unit?: number
          updated_at?: string
        }
      }
    }
  }
}
