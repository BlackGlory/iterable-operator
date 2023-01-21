import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils.js'
import { joinAsync } from '@src/join-async.js'

describe('joinAsync', () => {
  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const sep = 1

    const result = joinAsync(iter, sep)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  test('returns the joined iterable', async () => {
    const iter = toAsyncIterable([1, 2, 3])

    const result = joinAsync(iter, '+')
    const arrResult = await toArrayAsync(result)

    expect(arrResult).toEqual([1, '+', 2, '+', 3])
  })
})
