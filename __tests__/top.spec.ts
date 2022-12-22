import { top } from '@src/top'
import { compareNumbersAscending, compareNumbersDescending } from 'extra-sort'

describe('top', () => {
  test('num > count(iter)', () => {
    const iter = [1, 2, 3]
    const num = 5

    const result = top(iter, num, compareNumbersAscending)

    expect(result).toStrictEqual([1, 2, 3])
  })

  test('asc', () => {
    const iter = [1, 2, 3]
    const num = 2

    const result = top(iter, num, compareNumbersAscending)

    expect(result).toStrictEqual([1, 2])
  })

  test('desc', () => {
    const iter = [1, 2, 3]
    const num = 2

    const result = top(iter, num, compareNumbersDescending)

    expect(result).toStrictEqual([3, 2])
  })

  test('equivalent elements inserted later do not replace previous elements', () => {
    const iter = [2, 4, 6]
    const num = 2
    const compare = (a: number, b: number): number => {
      return compareNumbersAscending(a % 2, b % 2)
    }

    const result = top(iter, num, compare)

    expect(result).toStrictEqual([2, 4])
  })
})
