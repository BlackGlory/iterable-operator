import { consume, toArray, MockIterable, take } from '@test/utils'
import { difference } from '@intermediate/difference'
import '@blackglory/jest-matchers'

describe('difference', () => {
  test('lazy and partial evaluation', () => {
    const leftIter = new MockIterable([1, 2, 3])
    const rightIter: number[] = []

    const result = difference(leftIter, rightIter)
    const isLazy = leftIter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = leftIter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  it('returns the difference iterable', () => {
    const leftIter = [1, 2]
    const rightIter = [2, 3]

    const result = difference(leftIter, rightIter)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toStrictEqual([1])
  })
})
