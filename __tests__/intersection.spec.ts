import { consume, toArray, MockIterable, take } from '@test/utils'
import { intersection } from '@src/intersection'

describe('intersection', () => {
  test('lazy and partial evaluation', () => {
    const leftIter = new MockIterable([1, 2])
    const rightIter: number[] = [1, 2]

    const result = intersection(leftIter, rightIter)
    const isLazy = leftIter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = leftIter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  it('returns the intersection iterable', () => {
    const leftIter = [1, 2]
    const rightIter = [2, 3]

    const result = intersection(leftIter, rightIter)
    const arrResult = toArray(result)

    expect(arrResult).toStrictEqual([2])
  })
})
