/**
 * Cleans a delimited field by removing pipes, quotes, and brackets
 * Used for processing VCF data fields that may contain various delimiters
 *
 * @param raw - The raw string to clean
 * @returns The cleaned string with delimiters removed and trimmed
 */
export function cleanDelimitedField(raw: string): string {
  return raw
    .replace(/\|/g, ' ')
    .replace(/"/g, '')
    .replace(/^\[/, '')
    .replace(/\]$/, '')
    .trim()
}
