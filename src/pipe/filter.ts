import { BreakFlag, ContinueFlag } from '../$'

export function* filter<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T> {
  let index = 0
  for (const element of iterable) {
    try {
      if (fn(element, index++)) {
        yield element
      }
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
}
