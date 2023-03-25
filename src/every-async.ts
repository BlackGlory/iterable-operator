import { Awaitable} from 'justypes'

export async function everyAsync<T>(
  iterable: Iterable<T> | AsyncIterable<T>
, predicate: (element: T, index: number) => Awaitable<unknown>
): Promise<boolean> {
  let index = 0
  for await (const element of iterable) {
    if (!await predicate(element, index)) return false
    index++
  }
  return true
}
