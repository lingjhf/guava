import type { JSX } from 'solid-js'
import { createEffect, createSignal, mergeProps } from 'solid-js'
import { customElement } from 'solid-element'
import styles from './styles.css?inline'
export interface precentageColor {
  percentage: number
  color: string
}

export interface GProgressProps {
  percentage: number
  colors: precentageColor[] | ((value: number) => string)
  text?: (value: number) => JSX.Element
}

customElement<Partial<GProgressProps>>(
  'g-progress',
  { percentage: undefined, colors: undefined, text: undefined },
  (props) => {
    return (
      <>
        <style>{styles}</style>
        <GProgress
          percentage={props.percentage}
          colors={props.colors}
          text={props.text}
        ></GProgress>
      </>
    )
  }
)

const GProgress = (props: Partial<GProgressProps>) => {
  let progressRef: HTMLElement
  let outsideTextRef: HTMLElement
  const setProgressRef = (el: HTMLElement) => (progressRef = el)
  const setOutsideTextRef = (el: HTMLElement) => (outsideTextRef = el)
  const defaultProps = mergeProps<[GProgressProps, ...Partial<GProgressProps>[]]>(
    {
      percentage: 0,
      colors: [{ percentage: 100, color: '#3b82f6' }],
    },
    props
  )

  const [percentage, setPercentage] = createSignal(0)
  const [percentageWidth, setPercentageWidth] = createSignal(0)
  const [color, setColor] = createSignal('')

  createEffect(() => {
    let p = defaultProps.percentage
    if (p > 100) {
      p = 100
    } else if (p < 0) {
      p = 0
    }
    if (typeof defaultProps.colors === 'function') {
      setColor(defaultProps.colors(p))
    } else {
      let start = 0
      for (const item of defaultProps.colors) {
        if (p >= start && p <= item.percentage) {
          setColor(item.color)
          break
        }
        start = item.percentage
      }
    }
    setPercentage(Math.round(p))
    setPercentageWidth(
      ((progressRef.getBoundingClientRect().width - outsideTextRef.getBoundingClientRect().width) *
        percentage()) /
        100
    )
  })

  const percentageStyles = () => `width:${percentageWidth()}px;background-color:${color()}`

  return (
    <div ref={setProgressRef} class="g-progress-line">
      <div class="g-progress-container">
        <div class="g-progress-percentage" style={percentageStyles()}></div>
      </div>
      <div ref={setOutsideTextRef} class="g-progress-outside-text">
        {defaultProps.text ? defaultProps.text(percentage()) : `${percentage()}%`}
      </div>
    </div>
  )
}

declare module 'solid-js' {
  namespace JSX {
    interface IntrinsicElements {
      'g-progress': Partial<GProgressProps>
    }
  }
}
