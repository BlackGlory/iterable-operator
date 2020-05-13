import { InvalidArgumentsLengthError } from '@src/error'
export { InvalidArgumentsLengthError }

export function zip<T1, T2>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
): Iterable<Array<T1 | T2>>
export function zip<T1, T2, T3>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
): Iterable<Array<T1 | T2 | T3>>
export function zip<T1, T2, T3, T4>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
): Iterable<Array<T1 | T2 | T3 | T4>>
export function zip<T1, T2, T3, T4, T5>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
): Iterable<Array<T1 | T2 | T3 | T4 | T5>>
export function zip<T1, T2, T3, T4, T5, T6>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
, iterable6: Iterable<T6>
): Iterable<Array<T1 | T2 | T3 | T4 | T5 | T6>>
export function zip<T1, T2, T3, T4, T5, T6, T7>(
  iterable1: Iterable<T1>
, iterable2: Iterable<T2>
, iterable3: Iterable<T3>
, iterable4: Iterable<T4>
, iterable5: Iterable<T5>
, iterable6: Iterable<T6>
, iterable7: Iterable<T7>
): Iterable<Array<T1 | T2 | T3 | T4 | T5 | T6 | T7>>
export function zip<TResult>(
  ...iterables: Iterable<unknown>[]
): Iterable<TResult[]>
export function zip<TResult>(...iterables: Iterable<any>[]): Iterable<TResult[]> {
  if (iterables.length < 2) throw new InvalidArgumentsLengthError('zip', 2, iterables.length)

  return zipWithSize(iterables, iterables.length)
}

function* zipWithSize<T>(iterables: Iterable<any>[], size: number): Iterable<T[]> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
  while (true) {
    const result = new Array<T>(size)
    for (let i = 0; i < size; i++) {
      const { value, done } = iterators[i].next()
      if (done) return
      result[i] = value
    }
    yield result
  }
}