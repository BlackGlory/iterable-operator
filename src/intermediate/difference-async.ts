import { filterAsync } from '@intermediate/filter-async'
import { toSetAsync } from '@terminal/to-set-async'

export async function* differenceAsync<T>(
  left: AsyncIterable<T>
, right: Iterable<T> | AsyncIterable<T>
): AsyncIterableIterator<T> {
  const rightSet = await toSetAsync(right)
  yield* filterAsync(left, async x => !rightSet.has(await x))
}
