import { Position, Size } from '@lingjhf/utils'

type SizePosition = Position & Size

export function moveItem(sourceIndex: number, targetIndex: number, arr: unknown[]) {
  const itemTemp = arr[sourceIndex]
  arr.splice(sourceIndex, 1)
  arr.splice(targetIndex, 0, itemTemp)
}

export function checkCrossEdge(source: Position, target: SizePosition): boolean {
  if (
    source.x > target.x &&
    source.x < target.x + target.width &&
    source.y > target.y &&
    source.y < target.y + target.height
  ) {
    return true
  }
  return false
}

/**
 *
 * @param source
 * @param target
 * @returns 1表示在上面，0表示在下面，-1表示不在范围
 */
export function checkCrossHalf(source: Position, target: SizePosition): number {
  if (source.x > target.x && source.x < target.x + target.width) {
    if (source.y > target.y && source.y < target.y + target.height / 2) {
      return 1
    }
    if (source.y > target.y && source.y < target.y + target.height) {
      return 0
    }
  }
  return -1
}
