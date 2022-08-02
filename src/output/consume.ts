export function consume<T, U>(
  iterable: Iterable<T>
, consumer: (iterable: Iterable<T>
) => U): U
export function consume<T, U>(
  iterable: AsyncIterable<T>
, consumer: (iterable: AsyncIterable<T>) => U
): U
export function consume<T>(
  iterable: unknown
, consumer: (...args: any) => T
): T {
  return consumer(iterable)
}
