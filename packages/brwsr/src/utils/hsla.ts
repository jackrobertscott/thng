/**
 *
 */
export const hsla = (
  h: number = 0,
  s: number = 0,
  l: number = 0,
  a: number = 1
) => {
  /**
   *
   */
  return {
    /**
     *
     */
    lighten(percent: number) {
      if (a >= 0.55) return hsla(h, s, l + percent, a)
      return hsla(h, s, l, a + percent / 100)
    },
    /**
     *
     */
    darken(percent: number) {
      if (a >= 0.55) return hsla(h, s, l - percent, a)
      return hsla(h, s, l, a - percent / 100)
    },
    /**
     *
     */
    get normal() {
      return `hsla(${h}, ${s}%, ${l}%, ${a})`
    },
    /**
     *
     */
    get hover() {
      return l <= 55 || a <= 0.55
        ? this.lighten(10).normal
        : this.darken(10).normal
    },
    /**
     *
     */
    get active() {
      return l <= 55 || a <= 0.55
        ? this.lighten(5).normal
        : this.darken(15).normal
    },
    /**
     *
     */
    get focus() {
      return l <= 55 || a <= 0.55
        ? this.lighten(10).normal
        : this.darken(10).normal
    },
  }
}
/**
 *
 */
export type TypeHSLA = ReturnType<typeof hsla>
