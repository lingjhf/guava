import { JSX } from 'solid-js/jsx-runtime'
import { ComponentProps, ValueChanged } from '../types'
import { customEventHandlersName, generateProps } from '../utils'
import { For, Show, createEffect, createSignal } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import { CheckFilled } from '../icon/check-filled'
import styles from './cascader-panel.module.css'
import { GCheckbox } from '../checkbox'

export type CascaderProps = Record<string, unknown>

export type CascaderValue = string[] | string[][]

type CascaderPath = string[]

export interface CascaderPanelProps extends ComponentProps<HTMLDivElement> {
  options: CascaderProps[]
  value: CascaderValue,
  optionName: string
  optionValue: string
  expandTrigger: 'click' | 'hover'
  multiple: boolean
  children?: () => JSX.Element
  change?: ValueChanged<CascaderValue>
}

interface CascaderOption {
  name: string
  value: string
  level: number
  active: boolean
  parent?: CascaderOption
  path: CascaderPath
  checked: boolean
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
    },
    customEventHandlersName,
  )

  const [cascader, setCascader] = createStore<CascaderOption[][]>([])
  const [currentOption, setCurrentOption] = createSignal<CascaderValue>([])

  createEffect(() => {
    setCascader([transformOptions(props.options)])
  })

  const cascaderOptionClasses = (option: CascaderOption) => {
    let classes = `${styles.cascaderOption}`
    if (option.active || isCurrentOption(option.path)) {
      classes += ` ${styles.cascaderOptionActive}`
    }
    return classes
  }

  function isCurrentOption(path: CascaderPath) {
    return currentOption().join('') === path.join('')
  }

  function transformOptions(options: CascaderProps[], parent?: CascaderOption, level = 0): CascaderOption[] {
    const newOptions: CascaderOption[] = []
    for (const option of options) {
      const newOption: CascaderOption = {
        name: option[props.optionName] as string,
        value: option[props.optionValue] as string,
        active: false,
        path: [...parent?.path ?? [], option[props.optionValue] as string],
        parent,
        level,
        checked: false,
        children: [],
      }
      if (Array.isArray(option.children) && option.children.length > 0) {
        newOption.children = transformOptions(option.children, newOption, level + 1)
      }
      newOptions.push(newOption)
    }
    return newOptions
  }

  function expandSubOptions(option: CascaderOption) {
    if (option.active) return
    setCascader((_, index) => index === option.level, produce(state => {
      state.forEach(item => item.active = false)
      for (const item of state) {
        if (item.value === option.value) {
          item.active = true
          break
        }
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

  function checkedSubOptions(options: CascaderOption[], checked: boolean) {
    for (const option of options) {
      option.checked = checked
      if (option.children.length > 0) {
        checkedSubOptions(option.children, checked)
      }
    }
  }

  function triggerClick(option: CascaderOption) {
    if (props.expandTrigger === 'click') {
      expandSubOptions(option)
    }
    if (option.children.length === 0) {
      setCurrentOption(option.path)
      props.change?.([...option.path])
    }
  }

  function triggerHover(option: CascaderOption) {
    if (props.expandTrigger === 'hover' && option.children.length > 0) {
      expandSubOptions(option)
    }
  }

  function checkboxChange(value: boolean, option: CascaderOption) {
    setCascader(produce(state => {
      const currentOption = state[option.level].find(item => item.value === option.value)
      if (currentOption) {
        currentOption.checked = value
        checkedSubOptions(currentOption.children ?? [], value)
      }
    }))
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
                          onClick={[triggerClick, option]}
                          onMouseEnter={[triggerHover, option]}
                        >
                          <Show when={props.multiple}>
                            <div class={styles.cascaderOptionCheckbox}>
                              <GCheckbox
                                size={14}
                                checked={option.checked}
                                change={(value) => checkboxChange(value, option)}
                              />
                            </div>
                          </Show>
                          <div class={styles.cascaderOptionContent}>
                            {option.name}
                          </div>
                          <div class={styles.cascaderOptionExpand}>
                            <Show when={option.children.length > 0}>
                              <ChevronRightFilled />
                            </Show>
                            <Show when={!props.multiple && isCurrentOption(option.path)}>
                              <CheckFilled />
                            </Show>
                          </div>
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