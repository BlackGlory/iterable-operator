export function consumeAsync<T, U>(
  iterable: AsyncIterable<T>
, consumer: (iterable: AsyncIterable<T>) => U
): U {
  return consumer(iterable)
}
