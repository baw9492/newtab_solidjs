export function compressImage(originalImage: HTMLImageElement) {
  const compressedCanvas = document.createElement('canvas')
  const ctx = compressedCanvas.getContext('2d')!

  const maxWidth = 50 // 设置压缩后的最大宽度
  const maxHeight = 50 // 设置压缩后的最大高度

  const width = originalImage.width
  const height = originalImage.height

  // 根据最大宽度和最大高度计算压缩比例
  let ratio = 1
  if (width > maxWidth) {
    ratio = maxWidth / width
  } else if (height > maxHeight) {
    ratio = maxHeight / height
  }

  // 设置压缩后的宽度和高度
  compressedCanvas.width = width * ratio
  compressedCanvas.height = height * ratio

  // 在Canvas上绘制压缩后的图片
  ctx.drawImage(
    originalImage,
    0,
    0,
    compressedCanvas.width,
    compressedCanvas.height
  )

  // 获取压缩后的图片数据
  return compressedCanvas.toDataURL('image/webp') // 第二个参数是图片质量，可根据需要调整
}
