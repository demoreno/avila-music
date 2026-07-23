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
  price_ml_usd: number
  stock_total: number
  stock_minimum: number
  notes: string | null
  description: string | null
  is_active: boolean
  featured: boolean
  new_arrival: boolean
  /** Product code/name as the supplier tracks it — for building purchase order copy-paste text. */
  supplier_code: string | null
  created_at: string
  updated_at: string
  images?: ProductImage[]
}

export type PurchaseOrderStatus = 'pendiente' | 'en_proceso' | 'procesado' | 'en_camino' | 'recibido' | 'cancelado'

export interface PurchaseOrder {
  id: string
  notes: string | null
  status: PurchaseOrderStatus
  estimated_arrival_date: string | null
  created_at: string
  updated_at: string
}

export interface PurchaseOrderItem {
  id: string
  purchase_order_id: string
  product_id: string
  quantity: number
  created_at: string
}

export type PaymentMethod = 'efectivo_usd' | 'efectivo_bs'

export interface Sale {
  id: string
  sale_date: string
  channel: string
  ml_free_shipping: boolean
  discount_usd: number
  notes: string | null
  ml_commission_rate: number
  shipping_cost_usd: number
  payment_method: PaymentMethod | null
  shipping_type: string | null
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

export interface MonthlyKpiByChannel extends MonthlyKpi {
  channel: string
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

/** Mirrors v_sale_items_detail exactly — one row per sale_items line, joined with sale/product/category info. */
export interface SaleItemDetail {
  id: string
  sale_date: string
  sale_month: string
  channel: string
  product_name: string
  subcategory_name: string
  category_name: string
  quantity: number
  unit_price_usd: number
  unit_cost_usd: number
  net_income_usd: number
  gross_profit_usd: number
  margin_pct: number
  ml_commission_usd: number
  shipping_cost_usd: number
  sale_id: string
  product_id: string
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
          description: string | null
          is_active: boolean
          featured: boolean
          new_arrival: boolean
          supplier_code: string | null
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
          description?: string | null
          is_active?: boolean
          featured?: boolean
          new_arrival?: boolean
          supplier_code?: string | null
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
          description?: string | null
          is_active?: boolean
          featured?: boolean
          new_arrival?: boolean
          supplier_code?: string | null
          updated_at?: string
        }
      }
      purchase_orders: {
        Row: {
          id: string
          notes: string | null
          status: string
          estimated_arrival_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          notes?: string | null
          status?: string
          estimated_arrival_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          notes?: string | null
          status?: string
          estimated_arrival_date?: string | null
          updated_at?: string
        }
      }
      purchase_order_items: {
        Row: {
          id: string
          purchase_order_id: string
          product_id: string
          quantity: number
          created_at: string
        }
        Insert: {
          id?: string
          purchase_order_id: string
          product_id: string
          quantity: number
          created_at?: string
        }
        Update: {
          quantity?: number
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
          payment_method: string | null
          shipping_type: string | null
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
          payment_method?: string | null
          shipping_type?: string | null
          created_at?: string
        }
        Update: {
          sale_date?: string
          channel?: string
          ml_free_shipping?: boolean
          discount_usd?: number
          notes?: string | null
          payment_method?: string | null
          shipping_type?: string | null
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
      v_monthly_kpis_by_channel: {
        Row: {
          month: string
          channel: string
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
          sale_date: string
          sale_month: string
          channel: string
          product_name: string
          subcategory_name: string
          category_name: string
          quantity: number
          unit_price_usd: number
          unit_cost_usd: number
          net_income_usd: number
          gross_profit_usd: number
          margin_pct: number
          ml_commission_usd: number
          shipping_cost_usd: number
          sale_id: string
          product_id: string
        }
      }
    }
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
