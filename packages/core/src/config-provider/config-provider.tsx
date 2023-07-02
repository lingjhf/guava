import { lightTheme, darktheme } from '@lingjhf/guava-theme'
import { generateProps } from '../utils'
import type { GuavaParentProps } from '../types'

export interface ConfigProviderProps extends GuavaParentProps<HTMLDivElement> {
  dark: boolean
}

export const ConfigProvider = (propsRaw: Partial<ConfigProviderProps>) => {
  const props = generateProps(propsRaw, { dark: false })

  for (const key in props.dark ? darktheme : lightTheme) {
    document.documentElement.style.setProperty(key, darktheme[key])
  }
  function styles() {
    return props.dark ? darktheme : lightTheme
  }
  return (
    <div ref={props.ref}>{props.children}</div>
  )
}