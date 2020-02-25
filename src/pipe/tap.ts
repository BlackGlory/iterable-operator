import { BreakFlag, ContinueFlag } from '../$'

export function* tap<T>(iterable: Iterable<T>, fn: (element: T, index: number) => void): Iterable<T> {
  let index = 0
  for (const element of iterable) {
    try {
      fn(element, index++)
      yield element
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
}
