import { toAsyncIterable } from '@test/utils'
import { toArrayAsync } from '@terminal/to-array-async'
import '@blackglory/jest-matchers'

describe('toArrayAsync', () => {
  it('returns an array', async () => {
    const iter = toAsyncIterable([1, 2, 3])

    const result = toArrayAsync(iter)
    const proResult = await result

    expect(result).toBePromise()
    expect(proResult).toEqual([1, 2, 3])
  })
})
