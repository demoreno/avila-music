export interface Category {
  id: string
  parent_id: string | null
  name: string
  slug: string
  description: string | null
  sort_order: number
  is_active: boolean
  created_at: string
}

export interface Subcategory extends Category {
  parent_id: string
}

export interface ProductImage {
  id: string
  product_id: string
  storage_path: string
  sort_order: number
  is_primary: boolean
  created_at: string
}

export interface Product {
  id: string
  name: string
  slug: string
  subcategory_id: string
  cost_usd: number
  price_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  is_active: boolean
  created_at: string
  updated_at: string
  images?: ProductImage[]
}

export interface Sale {
  id: string
  sale_date: string
  channel: string
  ml_free_shipping: boolean
  discount_usd: number
  notes: string | null
  ml_commission_rate: number
  shipping_cost_usd: number
  created_at: string
}

export interface SaleItem {
  id: string
  sale_id: string
  product_id: string
  /** FROZEN — price at time of sale. Never update. */
  unit_price_usd: number
  /** FROZEN — cost at time of sale. Never update. */
  unit_cost_usd: number
  quantity: number
  ml_commission_usd: number
  shipping_cost_usd: number
  net_income_usd: number
  gross_profit_usd: number
  margin_pct: number
  created_at: string
}

export interface AppConfig {
  key: string
  value: string
  description: string | null
  updated_at: string
}

export interface InventoryMovement {
  id: string
  product_id: string
  movement_type: string
  quantity_delta: number
  reference_id: string | null
  notes: string | null
  created_at: string
  created_by: string | null
}

export interface PriceHistory {
  id: string
  product_id: string
  old_cost_usd: number | null
  new_cost_usd: number | null
  old_price_usd: number | null
  new_price_usd: number | null
  changed_at: string
  changed_by: string | null
}

export interface MonthlyKpi {
  month: string
  total_units_sold: number
  total_sales: number
  gross_revenue_usd: number
  total_ml_commissions_usd: number
  total_shipping_usd: number
  net_income_usd: number
  total_cost_usd: number
  gross_profit_usd: number
  avg_margin_pct: number
}

export interface ProductRanking {
  id: string
  product_name: string
  subcategory_name: string
  category_name: string
  stock_total: number
  stock_minimum: number
  stock_status: string
  total_units_sold: number
  total_net_income_usd: number
  total_gross_profit_usd: number
  avg_margin_pct: number
}

export interface CategoryTree {
  category_id: string
  category_name: string
  category_slug: string
  category_sort_order: number
  subcategory_id: string
  subcategory_name: string
  subcategory_slug: string
  subcategory_sort_order: number
  product_count: number
}

export interface SaleItemDetail {
  id: string
  sale_id: string
  product_id: string
  unit_price_usd: number
  unit_cost_usd: number
  quantity: number
  ml_commission_usd: number
  shipping_cost_usd: number
  net_income_usd: number
  gross_profit_usd: number
  margin_pct: number
  created_at: string
  sale_date: string
  channel: string
  ml_free_shipping: boolean
  product_name: string
  product_slug: string
  subcategory_name: string
  category_name: string
}

export interface CartItem {
  id: string
  name: string
  slug: string
  price_usd: number
  quantity: number
  image_url: string | null
}

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          parent_id: string | null
          name: string
          slug: string
          description: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          name: string
          slug: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          parent_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          sort_order?: number
          is_active?: boolean
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          subcategory_id: string
          cost_usd: number
          price_usd: number
          stock_total: number
          stock_minimum: number
          notes: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          subcategory_id: string
          cost_usd: number
          price_usd: number
          stock_total?: number
          stock_minimum?: number
          notes?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          name?: string
          slug?: string
          subcategory_id?: string
          cost_usd?: number
          price_usd?: number
          stock_total?: number
          stock_minimum?: number
          notes?: string | null
          is_active?: boolean
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          storage_path: string
          sort_order: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          storage_path: string
          sort_order?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          storage_path?: string
          sort_order?: number
          is_primary?: boolean
        }
      }
      sales: {
        Row: {
          id: string
          sale_date: string
          channel: string
          ml_free_shipping: boolean
          discount_usd: number
          notes: string | null
          ml_commission_rate: number
          shipping_cost_usd: number
          created_at: string
        }
        Insert: {
          id?: string
          sale_date: string
          channel?: string
          ml_free_shipping?: boolean
          discount_usd?: number
          notes?: string | null
          ml_commission_rate: number
          shipping_cost_usd?: number
          created_at?: string
        }
        Update: {
          sale_date?: string
          channel?: string
          ml_free_shipping?: boolean
          discount_usd?: number
          notes?: string | null
        }
      }
      sale_items: {
        Row: {
          id: string
          sale_id: string
          product_id: string
          unit_price_usd: number
          unit_cost_usd: number
          quantity: number
          ml_commission_usd: number
          shipping_cost_usd: number
          net_income_usd: number
          gross_profit_usd: number
          margin_pct: number
          created_at: string
        }
        Insert: {
          id?: string
          sale_id: string
          product_id: string
          unit_price_usd: number
          unit_cost_usd: number
          quantity: number
          ml_commission_usd: number
          shipping_cost_usd: number
          net_income_usd: number
          gross_profit_usd: number
          margin_pct: number
          created_at?: string
        }
        Update: never
      }
      app_config: {
        Row: {
          key: string
          value: string
          description: string | null
          updated_at: string
        }
        Insert: {
          key: string
          value: string
          description?: string | null
          updated_at?: string
        }
        Update: {
          value?: string
          description?: string | null
          updated_at?: string
        }
      }
      inventory_movements: {
        Row: {
          id: string
          product_id: string
          movement_type: string
          quantity_delta: number
          reference_id: string | null
          notes: string | null
          created_at: string
          created_by: string | null
        }
        Insert: {
          id?: string
          product_id: string
          movement_type: string
          quantity_delta: number
          reference_id?: string | null
          notes?: string | null
          created_at?: string
          created_by?: string | null
        }
        Update: never
      }
      price_history: {
        Row: {
          id: string
          product_id: string
          old_cost_usd: number | null
          new_cost_usd: number | null
          old_price_usd: number | null
          new_price_usd: number | null
          changed_at: string
          changed_by: string | null
        }
        Insert: {
          id?: string
          product_id: string
          old_cost_usd?: number | null
          new_cost_usd?: number | null
          old_price_usd?: number | null
          new_price_usd?: number | null
          changed_at?: string
          changed_by?: string | null
        }
        Update: never
      }
    }
    Views: {
      v_monthly_kpis: {
        Row: {
          month: string
          total_units_sold: number
          total_sales: number
          gross_revenue_usd: number
          total_ml_commissions_usd: number
          total_shipping_usd: number
          net_income_usd: number
          total_cost_usd: number
          gross_profit_usd: number
          avg_margin_pct: number
        }
      }
      v_product_ranking: {
        Row: {
          id: string
          product_name: string
          subcategory_name: string
          category_name: string
          stock_total: number
          stock_minimum: number
          stock_status: string
          total_units_sold: number
          total_net_income_usd: number
          total_gross_profit_usd: number
          avg_margin_pct: number
        }
      }
      v_category_tree: {
        Row: {
          category_id: string
          category_name: string
          category_slug: string
          category_sort_order: number
          subcategory_id: string
          subcategory_name: string
          subcategory_slug: string
          subcategory_sort_order: number
          product_count: number
        }
      }
      v_sale_items_detail: {
        Row: {
          id: string
          sale_id: string
          product_id: string
          unit_price_usd: number
          unit_cost_usd: number
          quantity: number
          ml_commission_usd: number
          shipping_cost_usd: number
          net_income_usd: number
          gross_profit_usd: number
          margin_pct: number
          created_at: string
          sale_date: string
          channel: string
          ml_free_shipping: boolean
          product_name: string
          product_slug: string
          subcategory_name: string
          category_name: string
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
