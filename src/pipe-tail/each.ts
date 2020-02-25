import { BreakFlag, ContinueFlag } from '../$'

export function each<T>(iterable: Iterable<T>, fn: (element: T, index: number) => void): void {
  let index = 0
  for (const element of iterable) {
    try {
      fn(element, index++)
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
}
