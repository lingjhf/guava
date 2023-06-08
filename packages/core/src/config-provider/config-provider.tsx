import { lightTheme, darktheme } from '@lingjhf/guava-theme'
import { generateProps } from '../utils'
import { ComponentPropsWithChildren } from '../types'

export interface ConfigProviderProps extends ComponentPropsWithChildren<HTMLDivElement> {
  dark: boolean
}

export const ConfigProvider = (propsRaw: Partial<ConfigProviderProps>) => {
  const props = generateProps(propsRaw, { dark: false })
  function styles() {
    return props.dark ? darktheme : lightTheme
  }
  return (
    <div style={styles()} ref={props.ref}>{props.children}</div>
  )
}