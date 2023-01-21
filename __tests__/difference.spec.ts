import { consume, toArray, MockIterable, take } from '@test/utils.js'
import { difference } from '@src/difference.js'

describe('difference', () => {
  test('lazy and partial evaluation', () => {
    const leftIter = new MockIterable([1, 2])
    const rightIter: number[] = [2, 3]

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

    expect(arrResult).toStrictEqual([1])
  })
})
