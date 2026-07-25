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
      app_config: {
        Row: {
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          slug: string
          sort_order: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          slug: string
          sort_order?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          slug?: string
          sort_order?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_category_tree"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "v_category_tree"
            referencedColumns: ["subcategory_id"]
          },
        ]
      }
      inventory_movements: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          movement_type: string
          notes: string | null
          product_id: string | null
          quantity_delta: number
          reference_id: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          movement_type: string
          notes?: string | null
          product_id?: string | null
          quantity_delta: number
          reference_id?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          movement_type?: string
          notes?: string | null
          product_id?: string | null
          quantity_delta?: number
          reference_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_movements_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          changed_at: string | null
          changed_by: string | null
          id: string
          new_cost_usd: number | null
          new_price_usd: number | null
          old_cost_usd: number | null
          old_price_usd: number | null
          product_id: string | null
        }
        Insert: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_cost_usd?: number | null
          new_price_usd?: number | null
          old_cost_usd?: number | null
          old_price_usd?: number | null
          product_id?: string | null
        }
        Update: {
          changed_at?: string | null
          changed_by?: string | null
          id?: string
          new_cost_usd?: number | null
          new_price_usd?: number | null
          old_cost_usd?: number | null
          old_price_usd?: number | null
          product_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "price_history_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
        ]
      }
      product_images: {
        Row: {
          created_at: string | null
          id: string
          is_primary: boolean
          product_id: string
          sort_order: number
          storage_path: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          product_id: string
          sort_order?: number
          storage_path: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_primary?: boolean
          product_id?: string
          sort_order?: number
          storage_path?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          cost_usd: number
          created_at: string | null
          description: string | null
          featured: boolean
          id: string
          is_active: boolean | null
          name: string
          new_arrival: boolean
          notes: string | null
          price_ml_usd: number
          price_usd: number
          slug: string
          stock_minimum: number
          stock_total: number
          subcategory_id: string
          supplier_code: string | null
          updated_at: string | null
        }
        Insert: {
          cost_usd: number
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          is_active?: boolean | null
          name: string
          new_arrival?: boolean
          notes?: string | null
          price_ml_usd?: number
          price_usd: number
          slug: string
          stock_minimum?: number
          stock_total?: number
          subcategory_id: string
          supplier_code?: string | null
          updated_at?: string | null
        }
        Update: {
          cost_usd?: number
          created_at?: string | null
          description?: string | null
          featured?: boolean
          id?: string
          is_active?: boolean | null
          name?: string
          new_arrival?: boolean
          notes?: string | null
          price_ml_usd?: number
          price_usd?: number
          slug?: string
          stock_minimum?: number
          stock_total?: number
          subcategory_id?: string
          supplier_code?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "v_category_tree"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "products_subcategory_id_fkey"
            columns: ["subcategory_id"]
            isOneToOne: false
            referencedRelation: "v_category_tree"
            referencedColumns: ["subcategory_id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: string
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string
          id: string
          product_id: string
          purchase_order_id: string
          quantity: number
        }
        Insert: {
          created_at?: string
          id?: string
          product_id: string
          purchase_order_id: string
          quantity: number
        }
        Update: {
          created_at?: string
          id?: string
          product_id?: string
          purchase_order_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          created_at: string
          estimated_arrival_date: string | null
          id: string
          notes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          estimated_arrival_date?: string | null
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          estimated_arrival_date?: string | null
          id?: string
          notes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      sale_items: {
        Row: {
          created_at: string | null
          gross_profit_usd: number | null
          id: string
          margin_pct: number | null
          ml_commission_usd: number | null
          net_income_usd: number | null
          product_id: string | null
          quantity: number
          sale_id: string | null
          shipping_cost_usd: number | null
          unit_cost_usd: number
          unit_price_usd: number
        }
        Insert: {
          created_at?: string | null
          gross_profit_usd?: number | null
          id?: string
          margin_pct?: number | null
          ml_commission_usd?: number | null
          net_income_usd?: number | null
          product_id?: string | null
          quantity?: number
          sale_id?: string | null
          shipping_cost_usd?: number | null
          unit_cost_usd: number
          unit_price_usd: number
        }
        Update: {
          created_at?: string | null
          gross_profit_usd?: number | null
          id?: string
          margin_pct?: number | null
          ml_commission_usd?: number | null
          net_income_usd?: number | null
          product_id?: string | null
          quantity?: number
          sale_id?: string | null
          shipping_cost_usd?: number | null
          unit_cost_usd?: number
          unit_price_usd?: number
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "sales"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_sale_id_fkey"
            columns: ["sale_id"]
            isOneToOne: false
            referencedRelation: "v_sale_items_detail"
            referencedColumns: ["sale_id"]
          },
        ]
      }
      sales: {
        Row: {
          channel: string
          created_at: string | null
          discount_usd: number | null
          id: string
          ml_commission_rate: number
          ml_free_shipping: boolean | null
          notes: string | null
          payment_method: string | null
          sale_date: string
          shipping_cost_usd: number
          shipping_type: string | null
        }
        Insert: {
          channel?: string
          created_at?: string | null
          discount_usd?: number | null
          id?: string
          ml_commission_rate: number
          ml_free_shipping?: boolean | null
          notes?: string | null
          payment_method?: string | null
          sale_date: string
          shipping_cost_usd: number
          shipping_type?: string | null
        }
        Update: {
          channel?: string
          created_at?: string | null
          discount_usd?: number | null
          id?: string
          ml_commission_rate?: number
          ml_free_shipping?: boolean | null
          notes?: string | null
          payment_method?: string | null
          sale_date?: string
          shipping_cost_usd?: number
          shipping_type?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      v_category_tree: {
        Row: {
          category_id: string | null
          category_name: string | null
          category_slug: string | null
          category_sort_order: number | null
          product_count: number | null
          subcategory_id: string | null
          subcategory_name: string | null
          subcategory_slug: string | null
          subcategory_sort_order: number | null
        }
        Relationships: []
      }
      v_monthly_kpis: {
        Row: {
          avg_margin_pct: number | null
          gross_profit_usd: number | null
          gross_revenue_usd: number | null
          month: string | null
          net_income_usd: number | null
          total_cost_usd: number | null
          total_ml_commissions_usd: number | null
          total_sales: number | null
          total_shipping_usd: number | null
          total_units_sold: number | null
        }
        Relationships: []
      }
      v_monthly_kpis_by_channel: {
        Row: {
          avg_margin_pct: number | null
          channel: string | null
          gross_profit_usd: number | null
          gross_revenue_usd: number | null
          month: string | null
          net_income_usd: number | null
          total_cost_usd: number | null
          total_ml_commissions_usd: number | null
          total_sales: number | null
          total_shipping_usd: number | null
          total_units_sold: number | null
        }
        Relationships: []
      }
      v_product_ranking: {
        Row: {
          avg_margin_pct: number | null
          category_name: string | null
          id: string | null
          product_name: string | null
          stock_minimum: number | null
          stock_status: string | null
          stock_total: number | null
          subcategory_name: string | null
          total_gross_profit_usd: number | null
          total_net_income_usd: number | null
          total_units_sold: number | null
        }
        Relationships: []
      }
      v_public_bestsellers: {
        Row: {
          product_id: string | null
          units_sold: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
        ]
      }
      v_reorder_intelligence: {
        Row: {
          avg_monthly_velocity: number | null
          category_name: string | null
          cost_usd: number | null
          id: string | null
          months_of_stock: number | null
          months_with_sales: number | null
          pending_in_orders: number | null
          product_name: string | null
          reorder_point: number | null
          stock_minimum: number | null
          stock_status: string | null
          stock_total: number | null
          subcategory_name: string | null
          suggested_order_cost: number | null
          suggested_order_qty: number | null
          supplier_code: string | null
          units_sold_period: number | null
          urgency: string | null
        }
        Relationships: []
      }
      v_sale_items_detail: {
        Row: {
          category_name: string | null
          channel: string | null
          gross_profit_usd: number | null
          id: string | null
          margin_pct: number | null
          ml_commission_usd: number | null
          net_income_usd: number | null
          product_id: string | null
          product_name: string | null
          quantity: number | null
          sale_date: string | null
          sale_id: string | null
          sale_month: string | null
          shipping_cost_usd: number | null
          subcategory_name: string | null
          unit_cost_usd: number | null
          unit_price_usd: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_product_ranking"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sale_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "v_reorder_intelligence"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      create_manual_sale: {
        Args: {
          p_channel: string
          p_created_by: string
          p_discount_usd: number
          p_items: Json
          p_notes: string
          p_payment_method: string
          p_sale_date: string
          p_shipping_type: string
        }
        Returns: {
          item_count: number
          sale_id: string
          total_gross_profit: number
          total_revenue: number
          total_shipping_cost: number
        }[]
      }
      is_admin: { Args: never; Returns: boolean }
      update_purchase_order_status: {
        Args: { p_created_by: string; p_order_id: string; p_status: string }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
