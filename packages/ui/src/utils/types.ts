import type { JSX } from 'solid-js'

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface SizePosition extends Position, Size { }

export interface Tree {
  children?: Tree[]
}

export type ValueChanged<T> = (value: T) => void

export type VoidCallback = () => void

export interface Inset {
  top: string
  right: string
  bottom: string
  left: string
}

export interface ComponentProps<T extends HTMLElement> extends JSX.CustomEventHandlersCamelCase<T> {
  ref?: T
}

export interface ComponentPropsWithChildren<T extends HTMLElement> extends ComponentProps<T> {
  children?: JSX.Element | JSX.Element[]
}