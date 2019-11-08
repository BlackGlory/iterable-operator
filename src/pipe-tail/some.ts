import { BreakFlag, ContinueFlag } from '../$'

export function some<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): boolean {
  let index = 0
  for (const element of iterable) {
    try {
      if (fn(element, index++)) return true
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
  return false
}
