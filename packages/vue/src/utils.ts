import type { Slots } from 'vue'
import { defineComponent } from 'vue'
import { createApp } from '@vue/runtime-dom'

export function slotToDom(
  slots: Slots,
  name: string,
  value: object,
  callback: (el: HTMLElement) => void
) {
  if (slots[name]) {
    const vnode = slots[name]?.(value)[0]
    createApp(
      defineComponent({
        mounted() {
          callback?.(this.$el)
        },
        render() {
          return vnode
        },
      })
    ).mount(document.createElement('div'))
  }
}
