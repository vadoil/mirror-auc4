export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.4"
  }
  public: {
    Tables: {
      bids: {
        Row: {
          amount: number
          bidder_email: string
          bidder_name: string
          bidder_phone: string | null
          created_at: string
          id: string
          lot_id: string
          user_id: string | null
        }
        Insert: {
          amount: number
          bidder_email: string
          bidder_name: string
          bidder_phone?: string | null
          created_at?: string
          id?: string
          lot_id: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          bidder_email?: string
          bidder_name?: string
          bidder_phone?: string | null
          created_at?: string
          id?: string
          lot_id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bids_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
        ]
      }
      lot_reservations: {
        Row: {
          created_at: string
          email: string
          id: string
          lot_id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          ticket_request_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          lot_id: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          ticket_request_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          lot_id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          ticket_request_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lot_reservations_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lot_reservations_ticket_request_id_fkey"
            columns: ["ticket_request_id"]
            isOneToOne: false
            referencedRelation: "ticket_requests"
            referencedColumns: ["id"]
          },
        ]
      }
      lots: {
        Row: {
          bid_step: number
          category: string | null
          created_at: string
          current_price: number
          delivery_terms: string | null
          description: string | null
          end_at: string | null
          id: string
          image_url: string | null
          is_active: boolean
          restrictions: string | null
          sort_order: number
          start_at: string | null
          starting_price: number
          status: Database["public"]["Enums"]["lot_status"]
          title: string
          updated_at: string
        }
        Insert: {
          bid_step?: number
          category?: string | null
          created_at?: string
          current_price?: number
          delivery_terms?: string | null
          description?: string | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          restrictions?: string | null
          sort_order?: number
          start_at?: string | null
          starting_price?: number
          status?: Database["public"]["Enums"]["lot_status"]
          title: string
          updated_at?: string
        }
        Update: {
          bid_step?: number
          category?: string | null
          created_at?: string
          current_price?: number
          delivery_terms?: string | null
          description?: string | null
          end_at?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean
          restrictions?: string | null
          sort_order?: number
          start_at?: string | null
          starting_price?: number
          status?: Database["public"]["Enums"]["lot_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          created_at: string
          id: string
          lot_id: string
          provider: string | null
          status: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          lot_id: string
          provider?: string | null
          status?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          lot_id?: string
          provider?: string | null
          status?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_lot_id_fkey"
            columns: ["lot_id"]
            isOneToOne: false
            referencedRelation: "lots"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_requests: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string | null
          status: string
          ticket_type: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone?: string | null
          status?: string
          ticket_type?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string | null
          status?: string
          ticket_type?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      lot_status: "draft" | "active" | "ended" | "paid" | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      lot_status: ["draft", "active", "ended", "paid", "archived"],
    },
  },
} as const
