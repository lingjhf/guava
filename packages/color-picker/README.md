# ColorPicker

<p align="center">
<img src="https://raw.githubusercontent.com/lingjhf/guava/master/images/colorPicker/color-picker.png" style="width:200px;" />
</p>

## 使用

```js
import { GColorPicker } from '@lingjhf/color-picker'

const example = () => {
  return (
    <GColorPicker color="#000"></GColorPicker>
  )
}

 ```

## 选项

### color

类型: `string`<br>
默认值: `null`

接受一个颜色字符串

### onChange

类型: `function`<br>
默认值: `null`

回调函数参数是一个Color对象<br>
参考: [Color](https://github.com/Qix-/color)
