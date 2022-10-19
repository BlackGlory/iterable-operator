import { toAsyncIterable, toArray } from '@test/utils'
import { toSetAsync } from '@terminal/to-set-async'
import '@blackglory/jest-matchers'

describe('toSetAsync', () => {
  it('returns a set', async () => {
    const iter = toAsyncIterable([1, 1, 2, 2, 3, 3])

    const result = toSetAsync(iter)
    const proResult = await result
    const arrResult = toArray(proResult)

    expect(result).toBePromise()
    expect(proResult).toBeInstanceOf(Set)
    expect(arrResult).toEqual([1, 2, 3])
  })
})
