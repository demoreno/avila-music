"""
Importa ventas históricas desde el Excel de Avila Music a Supabase.

Uso:
    SUPABASE_URL=... SUPABASE_SERVICE_KEY=... python scripts/seed_sales.py

Requiere:
    pip install pandas openpyxl supabase
"""

import os
import pandas as pd
from supabase import create_client

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

ML_COMMISSION_RATE = 0.11
SHIPPING_COST = 1.30

SALES_SHEETS = [
    'Febrero 2026 - Ventas',
    'Marzo 2026 - Ventas',
    'Abril 2026 - Ventas',
]


def clean_sales_df(df: pd.DataFrame) -> pd.DataFrame:
    df.columns = df.iloc[3]
    df = df.iloc[4:].reset_index(drop=True)
    df = df.rename(columns={
        '#': 'num',
        'Fecha': 'sale_date',
        'Producto': 'product_name',
        'Categoría': 'category',
        'Costo\nUSD': 'cost_usd',
        'Precio Venta\nUSD': 'price_usd',
        'Envío\nGratis': 'free_shipping',
    })
    df = df[df['product_name'].notna() & (df['product_name'] != 'Producto')]
    df['sale_date'] = pd.to_datetime(df['sale_date'], errors='coerce')
    return df[df['sale_date'].notna()]


def seed_sales():
    products = supabase.table('products').select('id, name').execute().data
    product_map = {p['name']: p['id'] for p in products}

    xl = pd.read_excel('Avila_Music_v12.xlsx', sheet_name=None, header=None)

    for sheet_name in SALES_SHEETS:
        if sheet_name not in xl:
            print(f"  ⚠️  Hoja no encontrada: '{sheet_name}', saltando...")
            continue

        df = clean_sales_df(xl[sheet_name].copy())
        print(f"Importando {len(df)} ventas de '{sheet_name}'...")

        for _, row in df.iterrows():
            product_id = product_map.get(str(row['product_name']).strip())
            if not product_id:
                print(f"  ⚠️  Producto no encontrado: {row['product_name']}")
                continue

            free_shipping = str(row.get('free_shipping', '')).strip().upper() == 'SÍ'
            cost  = float(row['cost_usd'])  if pd.notna(row['cost_usd'])  else 0.0
            price = float(row['price_usd']) if pd.notna(row['price_usd']) else 0.0

            commission   = round(price * ML_COMMISSION_RATE, 4)
            ship_cost    = SHIPPING_COST if free_shipping else 0.0
            net_income   = round(price - commission - ship_cost, 4)
            gross_profit = round(net_income - cost, 4)
            margin       = round(gross_profit / price, 6) if price > 0 else 0.0

            sale = supabase.table('sales').insert({
                'sale_date': row['sale_date'].date().isoformat(),
                'channel': 'mercadolibre',
                'ml_free_shipping': free_shipping,
                'ml_commission_rate': ML_COMMISSION_RATE,
                'shipping_cost_usd': SHIPPING_COST,
            }).execute().data[0]

            supabase.table('sale_items').insert({
                'sale_id': sale['id'],
                'product_id': product_id,
                'unit_price_usd': price,    # snapshot congelado — no actualizar
                'unit_cost_usd': cost,      # snapshot congelado — no actualizar
                'quantity': 1,
                'ml_commission_usd': commission,
                'shipping_cost_usd': ship_cost,
                'net_income_usd': net_income,
                'gross_profit_usd': gross_profit,
                'margin_pct': margin,
            }).execute()

        print(f"  ✅ '{sheet_name}' importado.")


if __name__ == '__main__':
    seed_sales()
