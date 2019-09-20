import { BreakFlag, ContinueFlag } from '../$'

// pipe end
// $
export function every<T>(iterator: Iterable<T>, fn: (element: T, index: number) => boolean): boolean {
  let index = 0
  for (const element of iterator) {
    try {
      if (!fn(element, index++)) return false
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
  return true
}
