export function parseLocString(locString: string) {
  const [chromosome, range] = locString.split(':')
  const [start, end] = range.split('..')
  return {
    chromosome,
    start: +start,
    end: +end,
  }
}
