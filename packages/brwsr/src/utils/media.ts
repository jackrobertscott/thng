/**
 *
 */
export const media = {
  /**
   *
   */
  greater(px: number) {
    return `@media (min-width: ${px}px)`
  },
  /**
   *
   */
  smaller(px: number) {
    return `@media (max-width: ${px - 1}px)`
  },
}
