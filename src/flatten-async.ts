import { flattenDeepAsync } from './flatten-deep-async.js'

export function flattenAsync<T>(
  iterable: AsyncIterable<unknown>
): AsyncIterableIterator<T> {
  return flattenDeepAsync<T>(iterable, 1)
}
