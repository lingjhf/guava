import { Component, mergeProps, JSX } from 'solid-js'
import { lightTheme, darktheme } from '@lingjhf/guava-theme'

export interface GConfigProviderProps {
  dark: boolean
  children?: JSX.Element | JSX.Element[]
}

export const GConfigProvider: Component<GConfigProviderProps> = (propsRaw: Partial<GConfigProviderProps>) => {
  const props = mergeProps<[GConfigProviderProps, ...Partial<GConfigProviderProps>[]]>(
    {
      dark: false
    },
    propsRaw,
  )
  const theme = props.dark ? darktheme : lightTheme
  return <div style={theme}>{props.children}</div>
}