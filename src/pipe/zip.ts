// pipe
export function  zip<T>(iterable: Iterable<T>): Iterable<T[]>
export function  zip<T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): Iterable<Array<T1 | T2>>
export function  zip<T1, T2, T3>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): Iterable<Array<T1 | T2 | T3>>
export function  zip<T1, T2, T3, T4>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): Iterable<Array<T1 | T2 | T3 | T4>>
export function  zip<T1, T2, T3, T4, T5>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>): Iterable<Array<T1 | T2 | T3 | T4 | T5>>
export function  zip<T1, T2, T3, T4, T5, T6>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>): Iterable<Array<T1 | T2 | T3 | T4 | T5 | T6>>
export function  zip<T1, T2, T3, T4, T5, T6, T7>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>, iterable7: Iterable<T7>): Iterable<Array<T1 | T2 | T3 | T4 | T5 | T6 | T7>>
export function  zip<TResult>(...iterables: Iterable<unknown>[]): Iterable<TResult[]>
export function* zip<TResult>(...iterables: Iterable<any>[]): Iterable<TResult[]> {
  const iterators = iterables.map(iterable => iterable[Symbol.iterator]())
  const length = iterators.length
  while (true) {
    const result = new Array<TResult>(length)
    for (let i = 0, dones = 0; i < length; i++) {
      const { value, done } = iterators[i].next()
      if (done && ++dones === length) return
      result[i] = value
    }
    yield result
  }
}
