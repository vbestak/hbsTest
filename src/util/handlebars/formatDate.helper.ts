export function formatDateHelper(date: Date | undefined, format: string): string {
  if(!date) return undefined;

  const pad = (number: number) => (number < 10 ? '0' : '') + number;

  const replacements = {
    yyyy: date.getFullYear(),
    yy: String(date.getFullYear()).slice(-2),
    MM: pad(date.getMonth() + 1),
    M: date.getMonth() + 1,
    dd: pad(date.getDate()),
    d: date.getDate(),
    hh: pad(date.getHours()),
    h: date.getHours(),
    mm: pad(date.getMinutes()),
    m: date.getMinutes(),
    ss: pad(date.getSeconds()),
    s: date.getSeconds(),
    SSS: String(date.getMilliseconds()).padStart(3, '0'),
    S: date.getMilliseconds(),
  };

  return format.replace(/yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|S/g, match => replacements[match]);
}
