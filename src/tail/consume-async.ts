export async function consumeAsync<T, U>(iterable: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) => PromiseLike<U>): Promise<U> {
  return await consumer(iterable)
}
