export type ValueChanged<T> = (value: T) => void

export type VoidCallback = () => void

export interface Inset {
  top: string
  right: string
  bottom: string
  left: string
}