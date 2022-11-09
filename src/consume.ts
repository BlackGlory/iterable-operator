export function consume<T, U>(
  iterable: Iterable<T>
, consumer: (iterable: Iterable<T>) => U): U {
  return consumer(iterable)
}
