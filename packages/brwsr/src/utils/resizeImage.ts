/**
 *
 */
export const resizeImage = async (file: File, maxWidth: number) => {
  return new Promise<File>((done, bad) => {
    const url = URL.createObjectURL(file)
    const cvs1 = document.createElement('canvas')
    const ctx1 = cvs1.getContext('2d')!
    const cvs2 = document.createElement('canvas')
    const ctx2 = cvs2.getContext('2d')!
    const img = new Image()
    img.src = url
    img.onload = () => {
      cvs1.height = img.naturalHeight
      cvs1.width = img.naturalWidth
      ctx1.drawImage(img, 0, 0)
      /**
       * todo: add incremental resize steps - better than a single large resize...
       */
      const width = Math.min(cvs1.width, maxWidth)
      cvs2.height = (cvs1.height / cvs1.width) * width
      cvs2.width = width
      ctx2.drawImage(cvs1, 0, 0, cvs2.width, cvs2.height)
      cvs2.toBlob((blob) => {
        if (blob) done(new File([blob], file.name))
        else bad(new Error('Failed to create a blob.'))
        URL.revokeObjectURL(url)
      })
    }
  })
}
