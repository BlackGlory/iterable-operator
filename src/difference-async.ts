import { filterAsync } from '@src/filter-async.js'
import { toSetAsync } from '@src/to-set-async.js'
import { Awaitable } from 'justypes'

export async function* differenceAsync<T>(
  left: Iterable<Awaitable<T>> | AsyncIterable<T>
, right: Iterable<Awaitable<T>> | AsyncIterable<T>
): AsyncIterableIterator<T> {
  const rightSet = await toSetAsync(right)
  yield* filterAsync(left, async x => !rightSet.has(await x))
}
