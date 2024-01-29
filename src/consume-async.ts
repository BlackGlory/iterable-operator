import { Awaitable } from 'justypes'

export function consumeAsync<T, U>(
  iterable: Iterable<T>
, consumer: (iterable: Iterable<T>) => Awaitable<U>
): Promise<Awaited<U>>
export function consumeAsync<T, U>(
  iterable: AsyncIterable<T>
, consumer: (iterable: AsyncIterable<T>) => Awaitable<U>
): Promise<Awaited<U>>
export async function consumeAsync<T>(
  iterable: unknown
, consumer: (iterable: any) => Awaitable<T>
): Promise<Awaited<T>> {
  return await consumer(iterable)
}
