import { Awaitable } from 'justypes'

export function consumeAsync<T, U>(
  iterable: Iterable<T>
, consumer: (iterable: Iterable<T>) => Awaitable<U>
): Promise<U>
export function consumeAsync<T, U>(
  iterable: AsyncIterable<T>
, consumer: (iterable: AsyncIterable<T>) => Awaitable<U>
): Promise<U>
export async function consumeAsync<U>(
  iterable: unknown
, consumer: (...args: any[]) => U
): Promise<U> {
  return await consumer(iterable)
}
