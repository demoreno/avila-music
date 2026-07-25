const bsFormatter = new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

export function formatBs(usdAmount: number, rate: number): string {
  return `Bs. ${bsFormatter.format(usdAmount * rate)}`
}

export function formatBcvRate(rate: number): string {
  return bsFormatter.format(rate)
}
