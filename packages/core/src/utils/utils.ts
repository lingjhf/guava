import type { Position, SizePosition, Tree, VoidCallback, GuavaEvent, ClassList } from '../types'
import type { MergeProps, SplitProps, JSX } from 'solid-js'
import { mergeProps, splitProps, onCleanup } from 'solid-js'
import { customEventHandlersName } from './constants'

class PressedDrag {
  events = new Map()

  onStart(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onStart', handler)
    return this
  }

  onUpdate(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onUpdate', handler)
    return this
  }

  onEnd(handler: (e: MouseEvent) => void): PressedDrag {
    this.events.set('onEnd', handler)
    return this
  }

  action() {
    const onStart = this.events.get('onStart')
    const onUpdate = this.events.get('onUpdate')
    const onEnd = this.events.get('onEnd')

    const onUp = (e: MouseEvent) => {
      onEnd?.(e)
      if (onStart) {
        window.removeEventListener('mousedown', onStart)
      }
      if (onUpdate) {
        window.removeEventListener('mousemove', onUpdate)
      }
      window.removeEventListener('mouseup', onUp)
    }
    if (onStart) {
      window.addEventListener('mousedown', onStart)
    }
    if (onUpdate) {
      window.addEventListener('mousemove', onUpdate)
    }
    window.addEventListener('mouseup', onUp)

    return this
  }

  cancelUpdate() {
    const onUpdate = this.events.get('onUpdate')
    if (onUpdate) {
      window.removeEventListener('mousemove', onUpdate)
    }
    return this
  }
}

export function createPressedDrag() {
  return new PressedDrag()
}

export function moveItem(sourceIndex: number, targetIndex: number, arr: unknown[]) {
  const itemTemp = arr[sourceIndex]
  arr.splice(sourceIndex, 1)
  arr.splice(targetIndex, 0, itemTemp)
}

export function checkCrossEdge(source: Position, target: SizePosition): boolean {
  if (
    source.x > target.x &&
    source.x < target.x + target.width &&
    source.y > target.y &&
    source.y < target.y + target.height
  ) {
    return true
  }
  return false
}

/**
 *
 * @param source
 * @param target
 * @returns 1表示在上面，0表示在下面，-1表示不在范围
 */
export function checkCrossHeightHalf(source: Position, target: SizePosition): number {
  if (source.x > target.x && source.x < target.x + target.width) {
    if (source.y > target.y && source.y < target.y + target.height / 2) {
      return 1
    }
    if (source.y > target.y && source.y < target.y + target.height) {
      return 0
    }
  }
  return -1
}

/**
 *
 * @param source
 * @param target
 * @returns 1表示在上面，0表示在下面，-1表示不在范围
 */
export function checkCrossWidthHalf(source: Position, target: SizePosition): number {
  if (source.y > target.y && source.y < target.y + target.height) {
    if (source.x > target.x && source.x < target.x + target.width / 2) {
      return 1
    }
    if (source.x > target.x && source.x < target.x + target.width) {
      return 0
    }
  }
  return -1
}

export function getTreeDeep<T extends Tree>(tree: Iterable<T>, num = 1) {
  let max = num
  for (const item of tree) {
    if (item.children && item.children.length > 0) {
      const _max = getTreeDeep(item.children, num + 1)
      if (_max > max) {
        max = _max
      }
    }
  }
  return max
}

export default function clickOutside(el: HTMLElement, accessor?: VoidCallback) {
  const onClick = (e: MouseEvent) => {
    !el.contains(e.target as Node) && accessor?.()
  }
  document.body.addEventListener('click', onClick)

  onCleanup(() => document.body.removeEventListener('click', onClick))
}

export type SplitKey<T> = [readonly (keyof T)[], ...(readonly (keyof T)[])[]]
export type DefaultProps<T> = [T, ...Partial<T>[]]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateProps<T extends Record<any, any>>(raw: Partial<T>, defaultValue: T): MergeProps<DefaultProps<T>>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateProps<T extends Record<any, any>, K extends SplitKey<T>>(raw: Partial<T>, defaultValue: T, ...splitKeys: K): SplitProps<MergeProps<DefaultProps<T>>, K>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateProps<T extends Record<any, any>, K extends SplitKey<T>>(raw: Partial<T>, defaultValue: T, ...splitKeys: K): MergeProps<DefaultProps<T>> | SplitProps<MergeProps<DefaultProps<T>>, K> {
  const props = mergeProps<DefaultProps<T>>(defaultValue, raw)
  if (splitKeys.length > 0) {
    return splitProps(props, ...splitKeys)
  }
  return props
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function generateSplitEventHandlersProps<T extends Record<any, any>>(raw: Partial<T>, defaultValue: T) {
  return generateProps(raw, defaultValue, customEventHandlersName)
}

export function eventHandlerCall<T extends HTMLElement, E extends Event>(eventHandler: JSX.EventHandlerUnion<T, E>, event: GuavaEvent<T, E>) {
  if (typeof eventHandler === 'function') {
    eventHandler?.(event)
  } else if (typeof eventHandler === 'object') {
    eventHandler[0](eventHandler[1], event)
  }
}

export function styles(s1: string[] | JSX.CSSProperties, s2?: string | JSX.CSSProperties) {
  let s: string[] = []
  if (Array.isArray(s1)) {
    s = s1
  } else {
    for (const key in s1) {
      s.push(`${key}:${s1[key]}`)
    }
  }
  if (typeof s2 === 'object') {
    for (const key in s2) {
      s.push(`${key}:${s2[key]}`)
    }
  } else if (typeof s2 === 'string') {
    s.push(s2)
  }
  return `${s.join(';')};`
}

export function classes(c1: string[], c2?: string) {
  const c = [...c1]
  if (c2) {
    c.push(c2)
  }
  return c.join(' ')
}

export function classList(c1: ClassList, c2?: ClassList) {
  return { ...c1, ...c2 }
}