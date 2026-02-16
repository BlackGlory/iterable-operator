import { assert } from '@blackglory/errors'

export function avg(iterable: Iterable<number>): number {
  let count = 0
  let sum = 0
  for (const element of iterable) {
    sum += element
    count++
  }
  assert(count > 0, 'The iterable has no elements.')

  return sum / count
}
