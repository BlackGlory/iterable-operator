import { flattenDeepAsync } from './flatten-deep-async'

export function flattenAsync<T>(
  iterable: AsyncIterable<unknown>
): AsyncIterableIterator<T> {
  return flattenDeepAsync<T>(iterable, 1)
}
