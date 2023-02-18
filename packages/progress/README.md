# Progress

<p align="center">
<img src="https://raw.githubusercontent.com/lingjhf/guava/master/images/progress/progress.png" style="width:400px;" />
</p>

## 使用

```js
import { GProgress } from '@lingjhf/progress'

const example = () => {
  return (
    <GProgress percentage={60}></GProgress>
  )
}

 ```

## 选项

### percentage

类型: `number`<br>
默认值: `0`

接受0-100的数字，小数会进行四舍五入转换

### colors

类型: `precentageColor[] | ((value: number) => string)`<br>
默认值: `[{ percentage: 100, color: '#3b82f6' }]`

接受一个对象数组或者函数进行自定义颜色

precentageColor包含一下属性

- percentage 百分比接受0-100的数字
- color 颜色字符串

如果是一个函数，函数参数是一个当前百分比，返回一个颜色字符串用于进度条显示的颜色，当进度发生变化，执行此函数

### text

类型: `(value: number) => JSX.Element`<br>
默认值: `null`

函数参数是一个当前的百分比，返回一个自定义的jsx，当进度发生变化，执行此函数
