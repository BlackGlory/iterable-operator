import { assert } from '@blackglory/errors'

export async function avgAsync(iterable: AsyncIterable<number>): Promise<number> {
  let count = 0
  let sum = 0
  for await (const element of iterable) {
    sum += element
    count++
  }
  assert(count > 0, 'The iterable has no elements.')

  return sum / count
}
