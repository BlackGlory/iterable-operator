import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return (async function* () {
    for await (const element of iterable) {
      if (count <= 0) break
      yield element
      count--
    }
  })()
}
