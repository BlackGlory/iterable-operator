import { BreakFlag, ContinueFlag } from '../$'

// pipe
// $
export function* map<T, U>(iterable: Iterable<T>, fn: (element: T, index: number) => U) {
  let index = 0
  for (const element of iterable) {
    try {
      yield fn(element, index++)
    } catch (e) {
      if (e === BreakFlag) break
      if (e === ContinueFlag) continue
      throw e
    }
  }
}

// export const pipeMap = <T, U>(fn: (element: T, index: number) => U) => (iterable: Iterable<T>) => map(iterable, fn)
