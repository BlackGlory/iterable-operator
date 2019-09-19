import { BreakFlag, ContinueFlag } from '../$'

// pipe
// $
export function* each<T>(iterable: Iterable<T>, fn: (element: T, index: number) => void) {
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
