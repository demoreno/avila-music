"""
Importa ventas de Junio 2026 desde Avila_Music_v12.xlsx a Supabase.

Uso:
    SUPABASE_URL=... SUPABASE_SERVICE_KEY=... python scripts/seed_june_sales.py

Requiere:
    pip install pandas openpyxl supabase
"""

import os
import sys
import pandas as pd
from supabase import create_client

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_KEY = os.environ["SUPABASE_SERVICE_KEY"]
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

ML_COMMISSION_RATE = 0.11
SHIPPING_COST = 1.30

SHEET_NAME = sys.argv[1] if len(sys.argv) > 1 else 'Junio 2026 - Ventas'

# Product names in Excel → current DB product names
NAME_MAP = {
    'Cuerdas Alice Clasica A106':
        'Cuerdas para Guitarra Clásica AC106-N (Tensión Normal / Nylon Transparente)',
    'Cuerdas Alice Electrica SL':
        'Cuerdas Alice Electrica A507 SL ',
    'Cuerdas Alice Electrica L':
        'Cuerdas Alice Electrica 507 L',
    'Cuerdas Alice Folk 11-52':
        'A206-SL 11-52 CUERDAS PARA GUITARRA ACÚSTICA SÚPER LIGERAS CON RECUBRIMIENTO DE ALEACIÓN Y BAÑO DE COBRE',
    'Cuerdas de Violin 4/4':
        'Cuerdas de Violín A703 – Núcleo de Acero y Aleación',
    'Cuerdas de Viola A90':
        'Cuerdas de Viola A903 – Núcleo de Acero y Aleación',
    'Daddario 09-44 Electrica':
        'Daddario 09-42 Electrica',
}

# Seed catalog prices (what was in effect during June) — keyed by slug
HISTORICAL_PRICES = {
    'cuerdas-alice-clasica-a106': 5.49,
    'clavijas-guitarra-clasica-doradas': 9.99,
    'clavijas-guitarra-clasica-plateadas': 12.99,
    'hombrera-violin-34-44': 11.00,
    'cejilla-cejuela': 5.00,
    'correa-guitarra-bajo': 5.49,
    'capotraste': 6.99,
    'cuerdas-alice-electrica-l': 5.49,
    'cuerdas-alice-electrica-sl': 5.49,
    'cuerdas-alice-folk-11-52': 5.49,
    'cuerdas-violin-44': 4.99,
    'cuerdas-viola-a90': 6.00,
    'cable-hebikuo-xa03': 10.00,
    'daddario-10-46-electrica': 14.00,
    'daddario-09-42-electrica': 14.00,
    'base-pared-guitarra-bajo': 4.99,
    'pines-de-correa': 5.00,
    'pickguard-negro-acustica': 5.00,
    'clavijas-bajo-mariposa': 10.00,
    'cuerdas-bajo-4c-alice': 12.99,
    'baqueta-bateria-5a': 5.00,
    'baqueta-bateria-5b': 5.00,
    'baqueta-bateria-7a': 5.00,
}


def detect_quantity(price: float, ref_price: float) -> tuple:
    if ref_price <= 0:
        return 1, price
    ratio = price / ref_price
    qty = round(ratio)
    if qty <= 0:
        return 1, price
    abs_diff = abs(price - qty * ref_price)
    if abs_diff < 0.50:
        return qty, round(price / qty, 4)
    return 1, price


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
        'Descuento\nUSD': 'discount_usd',
    })
    invalid_names = ['Producto', 'Categoría', 'Costo USD', 'Precio Venta\nUSD', 'Fecha']
    df = df[df['product_name'].notna()]
    df = df[~df['product_name'].isin(invalid_names)]
    df = df[~df['product_name'].str.contains('Total ventas', na=False)]
    df['sale_date'] = pd.to_datetime(df['sale_date'], errors='coerce')
    df = df[df['sale_date'].notna()]
    if 'Junio' in SHEET_NAME:
        df['sale_date'] = df['sale_date'].apply(
            lambda d: d.replace(month=6) if d.month == 5 else d
        )
    return df


def seed_june():
    products = supabase.table('products').select('id, name, price_usd, cost_usd, slug').execute().data
    product_map = {p['name'].strip(): p for p in products}
    product_map.update({n: product_map.get(m.strip()) for n, m in NAME_MAP.items() if product_map.get(m.strip())})

    xl = pd.read_excel('Avila_Music_v12.xlsx', sheet_name=None, header=None)

    if SHEET_NAME not in xl:
        print(f"Hoja no encontrada: '{SHEET_NAME}'")
        return

    df = clean_sales_df(xl[SHEET_NAME].copy())
    print(f"Importando {len(df)} ventas de '{SHEET_NAME}'...")

    imported = 0
    skipped = 0

    for _, row in df.iterrows():
        product = product_map.get(str(row['product_name']).strip())
        if not product:
            print(f"  Producto no encontrado: {row['product_name']}")
            skipped += 1
            continue

        free_shipping = str(row.get('free_shipping', '')).strip().upper() == 'SÍ'
        cost = float(row['cost_usd']) if pd.notna(row.get('cost_usd')) else 0.0
        price = float(row['price_usd']) if pd.notna(row.get('price_usd')) else 0.0
        discount = float(row['discount_usd']) if pd.notna(row.get('discount_usd')) else None

        ref_price = HISTORICAL_PRICES.get(product['slug'], float(product['price_usd']))
        qty, unit_price = detect_quantity(price, ref_price)
        unit_cost = cost / qty if qty > 1 else cost

        total_price = round(unit_price * qty, 4)
        total_cost = round(unit_cost * qty, 4)
        commission = round(total_price * ML_COMMISSION_RATE, 4)
        ship_cost = SHIPPING_COST if free_shipping else 0.0
        net_income = round(total_price - commission - ship_cost, 4)
        gross_profit = round(net_income - total_cost, 4)
        margin = round(gross_profit / total_price, 6) if total_price > 0 else 0.0

        sale_data = {
            'sale_date': row['sale_date'].date().isoformat(),
            'channel': 'mercadolibre',
            'ml_free_shipping': free_shipping,
            'ml_commission_rate': ML_COMMISSION_RATE,
            'shipping_cost_usd': SHIPPING_COST,
        }
        if discount is not None:
            sale_data['discount_usd'] = discount

        sale = supabase.table('sales').insert(sale_data).execute().data[0]

        supabase.table('sale_items').insert({
            'sale_id': sale['id'],
            'product_id': product['id'],
            'unit_price_usd': unit_price,
            'unit_cost_usd': unit_cost,
            'quantity': qty,
            'ml_commission_usd': commission,
            'shipping_cost_usd': ship_cost,
            'net_income_usd': round(net_income / qty, 4),
            'gross_profit_usd': round(gross_profit / qty, 4),
            'margin_pct': margin,
        }).execute()

        imported += 1

    print(f"  {SHEET_NAME}: {imported} importadas, {skipped} saltadas.")


if __name__ == '__main__':
    seed_june()
