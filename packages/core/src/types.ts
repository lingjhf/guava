import type { JSX } from 'solid-js'

export type ValueChanged<T> = (value: T) => void

export type VoidCallback = () => void

export interface ComponentProps<T extends HTMLElement> extends JSX.CustomEventHandlersCamelCase<T> {
  ref?: JSX.HTMLAttributes<T>['ref']
  class?: JSX.HTMLAttributes<T>['class']
  classList?: JSX.HTMLAttributes<T>['classList']
  style?: JSX.HTMLAttributes<T>['style']
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