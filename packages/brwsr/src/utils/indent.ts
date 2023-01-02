/**
 *
 */
export const indent = (value: number, single?: boolean) => {
  if (single) return `calc(${value}px - 0.25em)`
  return `calc(${value}px - 0.25em) ${value}px`
}
