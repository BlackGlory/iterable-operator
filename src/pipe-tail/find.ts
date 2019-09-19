import { BreakFlag, ContinueFlag } from '../$'

// pipe end
// $
export function find<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): T | undefined {
  let index = 0
  for (const element of iterable) {
    try {
      if (fn(element, index++)) return element
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
}
