
export function hyphenate (str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase()
}

export function camelize (str: string): string {
  return str.toLowerCase().replace(/-(\w)/g, (_, s) => s.toUpperCase())
}
