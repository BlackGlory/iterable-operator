import { describe, test, expect } from 'vitest'
import { toAsyncIterable } from '@test/utils.js'
import { compareNumbersAscending, compareNumbersDescending } from 'extra-sort'
import { topAsync } from '@src/top-async.js'

describe('topAsync', () => {
  test('num > count(iter)', async () => {
    const iter = toAsyncIterable([1, 2, 3])
    const num = 5

    const result = await topAsync(iter, num, compareNumbersAscending)

    expect(result).toStrictEqual([1, 2, 3])
  })

  test('asc', async () => {
    const iter = toAsyncIterable([1, 2, 3])
    const num = 2

    const result = await topAsync(iter, num, compareNumbersAscending)

    expect(result).toStrictEqual([1, 2])
  })

  test('desc', async () => {
    const iter = toAsyncIterable([1, 2, 3])
    const num = 2

    const result = await topAsync(iter, num, compareNumbersDescending)

    expect(result).toStrictEqual([3, 2])
  })

  test('equivalent elements inserted later do not replace previous elements', async () => {
    const iter = toAsyncIterable([2, 4, 6])
    const num = 2
    const compare = (a: number, b: number): number => {
      return compareNumbersAscending(a % 2, b % 2)
    }

    const result = await topAsync(iter, num, compare)

    expect(result).toStrictEqual([2, 4])
  })
})
