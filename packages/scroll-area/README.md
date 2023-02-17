# Scroll Area

<p align="center">
<img src="https://raw.githubusercontent.com/lingjhf/guava/master/images/scrollArea/scrollArea.png" style="width:200px;" />
</p>

## 使用

```js
import { GScrollArea } from '@lingjhf/scroll-area'

const example = () => {
  return (
    <div style="width:200px;height:200px">
      <GScrollArea scrollX={100} scrollY={100} type="visible">
        <div style="width:500px;height:500px">
          <p align="center">Guava</p>
        </div>
      </GScrollArea>
    </div>
  )
}

 ```

## 选项

### scrollX

类型: `number`<br>
默认值: `0`

垂直滚动条的位置

### scrollY

类型: `number`<br>
默认值: `0`

水平滚动条的位置

### type

类型: `string`<br>
默认值: `auto`

可接受三种选项

- `auto`      指定显示或者隐藏滚动条
- `visible`   显示滚动条
- `invisible` 隐藏滚动条

### onScroll

类型: `function`<br>
默认值: `null`

滚动条操作后的回调函数，鼠标滑轮滚动，鼠标拖拽滑块滚动都会执行这个回调函数
回调函数参数是一个scrollDetail，里面包含以下属性

- `scrollX` 水平滚动条当前位置
- `scrollY` 垂直滚动条当前位置
