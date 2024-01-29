import { Awaitable } from 'justypes'
import { isAsyncIterable } from '@src/is-async-iterable.js'
import { GetTypeOfIterable } from './utils.js'

enum Kind {
  Sync
, Async
}

export type ExtractTypeTupleFromAsyncLikeIterableTuple<T> = {
  [K in keyof T]:
    T[K] extends AsyncIterable<Awaitable<infer U>> ? Awaited<U> :
      T[K] extends Iterable<PromiseLike<infer V>> ? Awaited<V> :
        GetTypeOfIterable<T[K]>
}

export function zipAsync<
  T
, U extends Array<Iterable<Awaitable<unknown>> | AsyncIterable<Awaitable<unknown>>>
>(
  iterable: Iterable<Awaitable<T>> | AsyncIterable<Awaitable<T>>
, ...otherIterables: U
): AsyncIterableIterator<
  [Awaited<T>, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]
> {
  return _zipAsync(
    iterable
  , ...otherIterables
  ) as AsyncIterableIterator<
    [Awaited<T>, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]
  >
}

async function* _zipAsync<T>(
  ...iterables: Array<Iterable<Awaitable<T>> | AsyncIterable<Awaitable<T>>>
): AsyncIterableIterator<Array<Awaited<T>>> {
  const length = iterables.length
  const iterators = iterables.map(iterable => {
    if (isAsyncIterable(iterable)) {
      return [Kind.Async, iterable[Symbol.asyncIterator]()] as const
    } else {
      return [Kind.Sync, iterable[Symbol.iterator]()] as const
    }
  })
  const dones = iterators.map(() => false)

  try {
    while (true) {
      const result = new Array<Awaited<T>>(length)
      for (let i = 0; i < length; i++) {
        const [kind, iterator] = iterators[i]
        let temp: IteratorResult<Awaitable<T>>
        if (kind === Kind.Async) {
          temp = await (iterator as AsyncIterator<T>).next()
        } else {
          temp = (iterator as Iterator<Awaitable<T>>).next()
        }
        if (temp.done) {
          dones[i] = true
          return
        }
        result[i] = await temp.value
      }
      yield result
    }
  } finally {
    const undoneIterators = iterators.filter((_, i) => !dones[i])
    for (const [kind, iterator] of undoneIterators) {
      if (kind === Kind.Async) {
        await (iterator as AsyncIterator<T>).return?.()
      } else {
        (iterator as Iterator<T>).return?.()
      }
    }
  }
}
