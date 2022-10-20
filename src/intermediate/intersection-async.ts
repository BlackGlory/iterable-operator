import { filterAsync } from '@intermediate/filter-async'
import { toSetAsync } from '@terminal/to-set-async'
import { Awaitable } from 'justypes'

export async function* intersectionAsync<T>(
  left: Iterable<Awaitable<T>> | AsyncIterable<T>
, right: Iterable<Awaitable<T>> | AsyncIterable<T>
): AsyncIterableIterator<T> {
  const rightSet = await toSetAsync(right)
  yield* filterAsync(left, async x => rightSet.has(await x))
}
