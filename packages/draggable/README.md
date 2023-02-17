# Draggable

## 使用

```js
import { GDraggable } from '@lingjhf/draggable'

const example = () => {
  return (
    <GDraggable x={100} y={100}></GDraggable>
  )
}

 ```

## 选项

### x

类型: `number`<br>
默认值: `0`

x轴位置

### y

类型: `number`<br>
默认值: `0`

y轴位置

### minX

类型: `number`<br>
默认值: `0`

x轴最小值

### maxX

类型: `number`<br>
默认值: `0`

x轴最大值

### minY

类型: `number`<br>
默认值: `0`

y轴最小值

### maxY

类型: `number`<br>
默认值: `0`

y轴最大值

### onChange

类型: `(value: Position) => void`<br>
默认值: `null`

鼠标按下拖拽区域执行此函数<br>
`Position` 包含下列属性

- `x` x轴位置
- `y` y轴位置
