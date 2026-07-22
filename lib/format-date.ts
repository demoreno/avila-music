/**
 * Parses a "YYYY-MM-DD"-prefixed date/timestamp string as a LOCAL calendar date.
 *
 * `new Date(str)` treats bare "YYYY-MM-DD" (and any string carrying a UTC
 * offset) as UTC per the ECMA-262 spec, then `.toLocaleDateString()` renders
 * it in the browser's timezone — in any UTC-negative zone (e.g. Venezuela,
 * UTC-4) that silently shifts the displayed date back by one day. Extracting
 * the calendar fields and building the Date via the numeric constructor
 * avoids any timezone conversion.
 */
export function parseDateOnly(dateStr: string): Date {
  const [year, month, day] = dateStr.slice(0, 10).split('-').map(Number)
  return new Date(year, month - 1, day)
}
