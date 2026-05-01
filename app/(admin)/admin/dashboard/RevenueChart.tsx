'use client'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import type { MonthlyKpi } from '@/types/index'

interface RevenueChartProps {
  data: MonthlyKpi[]
}

function formatMonth(month: string) {
  const date = new Date(month + '-01')
  return date.toLocaleDateString('es-VE', { month: 'short', year: '2-digit' })
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const chartData = data.map((row) => ({
    mes: formatMonth(row.month),
    ingresos: Number(row.gross_revenue_usd),
    ganancia: Number(row.gross_profit_usd),
  }))

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
        <XAxis dataKey="mes" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
        <Tooltip
          formatter={(value, name) => [
            `USD ${Number(value).toFixed(2)}`,
            name === 'ingresos' ? 'Ingresos brutos' : 'Ganancia bruta',
          ]}
        />
        <Bar dataKey="ingresos" fill="#d97706" radius={[4, 4, 0, 0]} />
        <Bar dataKey="ganancia" fill="#0f172a" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
