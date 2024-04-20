import { describe, it, expect } from 'vitest'
import { toAsyncIterable, toArray } from '@test/utils.js'
import { toSetAsync } from '@src/to-set-async.js'

describe('toSetAsync', () => {
  it('returns a set', async () => {
    const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

    const result = await toSetAsync(iter)
    const arrResult = toArray(result)

    expect(result).toBeInstanceOf(Set)
    expect(arrResult).toEqual([1, 2, 3])
  })
})
