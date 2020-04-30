import { RuntimeError } from '@src/error'
export { RuntimeError }

export async function firstAsync<T>(iterable: AsyncIterable<T>): Promise<T> {
  for await (const element of iterable) {
    return element
  }
  throw new RuntimeError('Iterable is empty')
}
