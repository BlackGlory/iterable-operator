import { describe, it, expect, test } from 'vitest'
import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils.js'
import { uniqAsync } from '@src/uniq-async.js'

describe('uniqAsync', () => {
  it('returns the uniqed iterable', async () => {
    const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

    const result = uniqAsync(iter)
    const arrResult = await toArrayAsync(result)

    expect(arrResult).toEqual([1, 2, 3])
  })

  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])

    const result = uniqAsync(iter)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })
})
