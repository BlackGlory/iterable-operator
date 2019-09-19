// pipe
export function  concat<T>(iterable: Iterable<T>): Iterable<T>
export function  concat<T1, T2>(iterable1: Iterable<T1>, iterable2: Iterable<T2>): Iterable<T1 | T2>
export function  concat<T1, T2, T3>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>): Iterable<T1 | T2 | T3>
export function  concat<T1, T2, T3, T4>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>): Iterable<T1 | T2 | T3 | T4>
export function  concat<T1, T2, T3, T4, T5>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>): Iterable<T1 | T2 | T3 | T4 | T5>
export function  concat<T1, T2, T3, T4, T5, T6>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>): Iterable<T1 | T2 | T3 | T4 | T5 | T6>
export function  concat<T1, T2, T3, T4, T5, T6, T7>(iterable1: Iterable<T1>, iterable2: Iterable<T2>, iterable3: Iterable<T3>, iterable4: Iterable<T4>, iterable5: Iterable<T5>, iterable6: Iterable<T6>, iterable7: Iterable<T7>): Iterable<T1 | T2 | T3 | T4 | T5 | T6 | T7>
export function  concat<TResult>(...iterables: Iterable<unknown>[]): Iterable<TResult>
export function* concat<TResult>(...iterables: Iterable<any>[]): Iterable<TResult> {
  for (const iterable of iterables) {
    yield* iterable
  }
}
