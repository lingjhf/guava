import { Suspense, type FlowProps } from 'solid-js'
import { SpinnersRingResize } from './spinner'

export const Loading = (props: FlowProps) => {
  return (
    <Suspense fallback={
      <div class='w-full h-full flex items-center justify-center'>
        <SpinnersRingResize class='text-40px'></SpinnersRingResize>
      </div>
    }>
      {props.children}
    </Suspense>
  )
}