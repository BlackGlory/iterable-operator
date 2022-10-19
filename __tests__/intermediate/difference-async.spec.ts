import { consumeAsync, toArrayAsync, MockAsyncIterable, toAsyncIterable, takeAsync } from '@test/utils'
import { differenceAsync } from '@intermediate/difference-async'
import '@blackglory/jest-matchers'

describe('differenceAsync', () => {
  test('lazy and partial evaluation', async () => {
    const leftIter = new MockAsyncIterable([1, 2, 3])
    const rightIter: number[] = []

    const result = differenceAsync(leftIter, rightIter)
    const isLazy = leftIter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = leftIter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  it('returns difference iterable', async () => {
    const leftIter = toAsyncIterable([1, 2])
    const rightIter = [2, 3]

    const result = differenceAsync(leftIter, rightIter)
    const arrResult = await toArrayAsync(result)

    expect(result).toBeAsyncIterable()
    expect(arrResult).toStrictEqual([1])
  })
})
