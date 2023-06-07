import type { JSX } from 'solid-js'

export type ValueChanged<T> = (value: T) => void

export type VoidCallback = () => void

export interface ComponentProps<T extends HTMLElement> extends JSX.CustomEventHandlersCamelCase<T> {
  ref?: T
}

export interface ComponentPropsWithChildren<T extends HTMLElement> extends ComponentProps<T> {
  children?: JSX.Element | JSX.Element[]
}

export interface Position {
  x: number
  y: number
}

export interface Size {
  width: number
  height: number
}

export interface SizePosition extends Size, Position { }

export interface Tree {
  children?: Tree[]
}

export interface Inset {
  top: string
  right: string
  bottom: string
  left: string
}