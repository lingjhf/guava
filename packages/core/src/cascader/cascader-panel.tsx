import { JSX } from 'solid-js/jsx-runtime'
import { GuavaProps, ValueChanged } from '../types'
import { mergeClasses, mergeClassList, mergeStyles, generateSplitEventHandlersProps } from '../utils'
import { For, Show, createEffect, createSignal } from 'solid-js'
import { createStore, produce } from 'solid-js/store'
import { ChevronRightFilled } from '../icon/chevron-right-filled'
import { CheckFilled } from '../icon/check-filled'
import { GCheckbox } from '../checkbox'
import { GScrollbar } from '../scrollbar'
import styles from './cascader-panel.module.css'

export type CascaderProps = Record<string, unknown>

export type CascaderValue = string[] | string[][]

type CascaderPath = string[]

export interface CascaderPanelProps extends GuavaProps<HTMLDivElement> {
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
  indeterminate: boolean
  children: CascaderOption[]
}

export const CascaderPanel = (propsRaw: Partial<CascaderPanelProps>) => {
  const [eventHandlers, props] = generateSplitEventHandlersProps(
    propsRaw,
    {
      options: [],
      value: [],
      optionName: 'name',
      optionValue: 'value',
      expandTrigger: 'click',
      multiple: false,
    }
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
        indeterminate: false,
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

  function checkedParentOption(option: CascaderOption) {
    let isAllChecked = true
    let isAllNotChecked = true
    let isIndeterminate = false
    for (const child of option.children) {
      if (!child.checked) {
        isAllChecked = false
      }
      if (child.checked) {
        isAllNotChecked = false
      }
      if (child.indeterminate) {
        isIndeterminate = true
      }
    }
    if (isIndeterminate) {
      option.checked = false
      option.indeterminate = true
    } else if (isAllChecked) {
      option.checked = true
      option.indeterminate = false
    } else if (isAllNotChecked) {
      option.checked = false
      option.indeterminate = false
    } else {
      option.checked = false
      option.indeterminate = true
    }
    if (option.parent) {
      checkedParentOption(option.parent)
    }
  }

  function generateMultipleValue(options: CascaderOption[]) {
    let values: string[][] = []
    for (const option of options) {
      if (option.checked && option.children.length === 0) {
        values.push([...option.path])
      }
      if ((option.checked || option.indeterminate) && option.children.length > 0) {
        values = [...values, ...generateMultipleValue(option.children)]
      }
    }
    return values
  }

  function triggerClick(option: CascaderOption) {
    if (props.expandTrigger === 'click') {
      expandSubOptions(option)
    }
    if (option.children.length === 0) {
      setCurrentOption(option.path)
      if (!props.multiple) {
        props.change?.([...option.path])
      }
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
        if (!value) {
          currentOption.indeterminate = false
        }
        checkedSubOptions(currentOption.children ?? [], value)
        if (currentOption.parent) {
          checkedParentOption(currentOption.parent)
        }
      }
    }))
    const values = generateMultipleValue(cascader[0])
    props.change?.(values)
  }

  return (
    <div
      ref={props.ref}
      style={mergeStyles([], props.style)}
      class={mergeClasses([styles.cascaderPanel], props.class)}
      classList={mergeClassList({}, props.classList)}
      {...eventHandlers}
    >
      <For each={cascader}>
        {
          (options) => {
            return (
              <div class={styles.cascaderOptions}>
                <GScrollbar>
                  <For each={options}>
                    {
                      (option) => {
                        return (
                          <div
                            class={cascaderOptionClasses(option)}
                            onClick={[triggerClick, option]}
                            onMouseEnter={[triggerHover, option]}
                          >
                            <Show when={props.multiple}>
                              <div class={styles.cascaderOptionCheckbox}>
                                <GCheckbox
                                  size={14}
                                  checked={option.checked}
                                  indeterminate={option.indeterminate}
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
                </GScrollbar>
              </div>
            )
          }
        }
      </For>
    </div>
  )
}