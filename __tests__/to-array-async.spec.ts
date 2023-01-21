import { toAsyncIterable } from '@test/utils.js'
import { toArrayAsync } from '@src/to-array-async.js'

describe('toArrayAsync', () => {
  it('returns an array', async () => {
    const iter = toAsyncIterable([1, 2, 3])

    const result = await toArrayAsync(iter)

    expect(result).toEqual([1, 2, 3])
  })
})
