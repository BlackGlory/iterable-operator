import { consume, toArray, MockIterable, take } from '@test/utils'
import { join } from '@src/join'

describe('join', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const sep = 1

    const result = join(iter, sep)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  test('returns the joined iterable', () => {
    const iter = [1, 2, 3]

    const result = join(iter, '+')
    const arrResult = toArray(result)

    expect(arrResult).toEqual([1, '+', 2, '+', 3])
  })
})
