import { describe, test, expect } from 'vitest'
import { toAsyncIterable } from '@test/utils.js'
import { avgAsync } from '@src/avg-async.js'
import { getErrorPromise } from 'return-style'

describe('avgAsync', () => {
  test('general', async () => {
    const iter = toAsyncIterable([1, 2, 3])

    const result = await avgAsync(iter)

    expect(result).toBe(2)
  })

  test('edge: empty iterable', async () => {
    const iter = toAsyncIterable([])

    const error = await getErrorPromise(avgAsync(iter))

    expect(error).toBeInstanceOf(Error)
  })
})
