/**
 *
 */
const LOREM =
  'odio tempor orci dapibus ultrices in iaculis nunc sed augue lacus viverra vitae congue eu consequat ac felis donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc sed velit dignissim sodales ut eu sem integer vitae justo eget magna fermentum iaculis eu non diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci a scelerisque purus semper eget duis'
    .toLowerCase()
    .split('.')
    .join('')
    .split(',')
    .join('')
    .split(' ')
/**
 *
 */
export const lorem = {
  /**
   *
   */
  words(length: Number, format?: boolean) {
    const words: string[] = []
    for (let i = 0; i < length; i++)
      words[i] = LOREM[Math.floor(Math.random() * LOREM.length)]
    let out = words.join(' ')
    if (format) out = out.charAt(0).toUpperCase() + out.slice(1) + '.'
    return out
  },
}
