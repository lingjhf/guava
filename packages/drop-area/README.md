# DropArea

<p align="center">
<img src="https://raw.githubusercontent.com/lingjhf/guava/master/images/dropArea/drop-area.png" style="width:200px;" />
</p>

## 使用

```js
import { GDropArea } from '@guava/drop-area'

const example = () => {
  return (
    <GDropArea each={[1,2,3,4,5]}>{(item) => <div>{item as number}</div>}</GDropArea>
  )
}

 ```

## 选项

### each

类型: `unknown[]`<br>
默认值: `[]`

可循环的对象

### switchWhileCrossEdge

类型: `boolean`<br>
默认值: `false`

是否越过边界时交换

### children

类型: `(item: unknown, index: number) => JSX.Element`<br>
默认值: `null`

自定义拖拽项的内容
