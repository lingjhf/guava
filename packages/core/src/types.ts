import type { ParentProps, JSX } from 'solid-js'

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

export interface CustomEventHandlers<T extends HTMLElement> extends JSX.CustomEventHandlersCamelCase<T> {

  onFocusIn?: JSX.HTMLAttributes<T>['onFocusIn']
  onFocusOut?: JSX.HTMLAttributes<T>['onFocusOut']
}

export interface GuavaProps<T extends HTMLElement> extends CustomEventHandlers<T> {
  ref?: JSX.HTMLAttributes<T>['ref']
  class?: JSX.HTMLAttributes<T>['class']
  classList?: JSX.HTMLAttributes<T>['classList']
  style?: JSX.HTMLAttributes<T>['style']
}

export type GuavaParentProps<T extends HTMLElement> = ParentProps<GuavaProps<T>>

export type GuavaEvent<T, E extends Event> = E & {
  currentTarget: T;
  target: Element;
}

export type GuavaInputEvent<E extends Event> = E & {
  currentTarget: HTMLInputElement;
  target: HTMLInputElement;
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

export type ClassList = {
  [k: string]: boolean | undefined;
}