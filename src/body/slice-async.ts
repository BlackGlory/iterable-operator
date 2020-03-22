import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function sliceAsync<T>(iterable: AsyncIterable<T>, start: number): AsyncIterable<T>
export function sliceAsync<T>(iterable: AsyncIterable<T>, start: number, end: number): AsyncIterable<T>
export function sliceAsync<T>(iterable: AsyncIterable<T>, start: number, end: number = Infinity): AsyncIterable<T> {
  if (start < 0) throw new InvalidArgumentError('start', '>= 0')
  if (end < start) throw new InvalidArgumentError('end', '>= start')

  return (async function* () {
    let index = 0
    for await (const element of iterable) {
      if (index >= end) break
      if (index >= start) yield element
      index++
    }
  })()
}
