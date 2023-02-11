//hue转换x轴坐标
export function hueTransformX(hue: number, width: number) {
  return (hue / 360) * width
}

//x坐标转换hue
export function xTransformHue(x: number, width: number) {
  return (x / width) * 360
}

//alpha转换x坐标
export function alphaTransformX(alpha: number, width: number) {
  return alpha * width
}

//x坐标转换alpha
export function xTransformAlpha(x: number, width: number) {
  return x / width
}

//x坐标转换饱和度
export function xTransformSaturation(x: number, width: number) {
  return x / width
}

//饱和度转换x坐标
export function saturationTransformX(saturation: number, width: number) {
  return saturation * width
}

//y坐标转换明度
export function yTransformValue(value: number, height: number) {
  return (1 - value) * height
}

//明度转换y坐标
export function valueTransformY(y: number, height: number) {
  return 1 - y / height
}
