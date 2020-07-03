import { InvalidArgumentError } from '@src/error'
export { InvalidArgumentError }

export function takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T> {
  if (count < 0) throw new InvalidArgumentError('count', '>= 0')

  return (async function* () {
    if (count === 0) return
    for await (const element of iterable) {
      yield element
      count--
      if (count === 0) break
    }
  })()
}
