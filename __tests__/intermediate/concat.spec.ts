import { consume, toArray, MockIterable, take } from '@test/utils'
import { concat } from '@intermediate/concat'
import '@blackglory/jest-matchers'

describe('concat', () => {
  it('lazy and partial evaluation', () => {
    const iter1 = new MockIterable([1, 2, 3])
    const iter2: number[] = []

    const result = concat(iter1, iter2)
    const isLazy = iter1.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter1.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  it('returns the concated iterable', () => {
    const iter1 = [1, 2, 3]
    const iter2 = ['a', 'b', 'c']

    const result = concat(iter1, iter2)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
  })
})
