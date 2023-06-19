import { JSX } from 'solid-js/jsx-runtime'
import { ComponentProps, ValueChanged } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { For, Show, createEffect, createSignal } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import styles from './cascader-panel.module.css'
import { GCheckbox } from '../checkbox'

export type CascaderProps = Record<string, unknown>

export interface CascaderPanelProps extends ComponentProps<HTMLDivElement> {
  options: CascaderProps[]
  value: string[],
  optionName: string
  optionValue: string
  expandTrigger: 'click' | 'hover'
  multiple: boolean
  clearable: boolean
  disabled: boolean
  placeholder: string
  children?: () => JSX.Element
  change?: ValueChanged<string[]>
}

interface CascaderOption {
  name: string
  value: string
  level: number
  active: boolean
  path: string[]
  children: CascaderOption[]
}

export const CascaderPanel = (propsRaw: Partial<CascaderPanelProps>) => {
  const [eventHandlers, props] = generateProps(
    propsRaw,
    {
      options: [],
      value: [],
      optionName: 'name',
      optionValue: 'value',
      expandTrigger: 'click',
      multiple: false,
      clearable: false,
      disabled: false,
      placeholder: ''
    },
    customEventHandlersName,
  )

  const [cascader, setCascader] = createStore<CascaderOption[][]>([])
  const [currentOption, setCurrentOption] = createSignal<string[]>([])

  createEffect(() => {
    setCascader([transformOptions(props.options)])
  })

  const cascaderOptionClasses = (option: CascaderOption) => {
    let classes = `${styles.cascaderOption}`
    if (option.active || currentOption().join('') === option.path.join('')) {
      classes += ` ${styles.cascaderOptionActive}`
    }
    return classes
  }

  function transformOptions(options: CascaderProps[], path: string[] = [], level = 0): CascaderOption[] {
    const newOptions: CascaderOption[] = []
    for (const option of options) {
      const newOption: CascaderOption = {
        name: option[props.optionName] as string,
        value: option[props.optionValue] as string,
        active: false,
        path: [...path, option[props.optionValue] as string],
        level,
        children: [],
      }
      if (Array.isArray(option.children) && option.children.length > 0) {
        newOption.children = transformOptions(option.children, newOption.path, level + 1)
      }
      newOptions.push(newOption)
    }
    return newOptions
  }

  function expandSubOptions(option: CascaderOption) {
    setCascader((_, index) => index === option.level, produce(state => {
      state.forEach(item => item.active = false)
      const index = state.findIndex(item => item.value === option.value)
      if (index > -1) {
        state[index].active = true
      }
    }))
    if (option.children.length > 0) {
      setCascader((_, index) => index > option.level, produce(state => {
        state.forEach(item => item.active = false)
      }))
      setCascader(produce(v => {
        v.splice(option.level + 1)
        v.push(option.children)
      }))
    }
  }

  function clickTrigger(option: CascaderOption) {
    if (props.expandTrigger === 'click') {
      expandSubOptions(option)
    }
    if (option.children.length === 0) {
      setCurrentOption(option.path)
      props.change?.([...option.path])
    }
  }

  function enterTrigger(option: CascaderOption) {
    if (props.expandTrigger === 'hover' && option.children.length > 0) {
      expandSubOptions(option)
    }
  }

  return (
    <div class={styles.cascaderPanel}>
      <For each={cascader}>
        {
          (options) => {
            return (
              <div class={styles.cascaderOptions}>
                <For each={options}>
                  {
                    (option) => {
                      return (
                        <div
                          class={cascaderOptionClasses(option)}
                          {...eventHandlers}
                          onClick={[clickTrigger, option]}
                          onMouseEnter={[enterTrigger, option]}
                        >
                          <Show when={props.multiple}>
                            <GCheckbox></GCheckbox>
                          </Show>
                          <div class={styles.cascaderOptionContent}>
                            {option.name}
                          </div>
                          <Show when={option.children.length > 0}>
                            <div class={styles.cascaderOptionExpand}>
                              <ChevronRightFilled />
                            </div>
                          </Show>
                        </div>
                      )
                    }
                  }
                </For>
              </div>
            )
          }
        }
      </For>
    </div>
  )
}