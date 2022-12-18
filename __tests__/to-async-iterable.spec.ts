import { consumeAsync, toArrayAsync, MockIterable, takeAsync } from '@test/utils'
import { toAsyncIterable } from '@src/to-async-iterable'

describe('toAsyncIterable', () => {
  describe('returns AsyncIterable', () => {
    test('Iterable<PromiseLike>', async () => {
      const iter = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]

      const result = toAsyncIterable(iter)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([1, 2, 3])
    })

    test('Iterable<NonPromiseLike>', async () => {
      const iter = [1, 2, 3]

      const result = toAsyncIterable(iter)
      const arrResult = await toArrayAsync(result)

      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  test('lazy and partial evaluation', async () => {
    const iter = new MockIterable([1, 2, 3])

    const result = toAsyncIterable(iter)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })
})
