import { toSetAsync } from '@tail/to-set-async'

export async function* uniqAsync<T>(iterable: AsyncIterable<T>): AsyncIterable<T> {
  yield* await toSetAsync(iterable)
}