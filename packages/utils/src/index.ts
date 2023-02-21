export * from './type'

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
