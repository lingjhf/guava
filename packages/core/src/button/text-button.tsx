import { Button, ButtonProps } from './button'

export const TextButton = (props: Partial<ButtonProps>) => {
  return (
    <Button {...props}></Button>
  )
}