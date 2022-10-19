import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync } from '@test/utils'
import { flattenAsync } from '@intermediate/flatten-async'
import '@blackglory/jest-matchers'

describe('flattenAsync', () => {
  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])

    const result = flattenAsync(iter)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('returns an empty iterable', async () => {
      const iter = toAsyncIterable([])

      const result = flattenAsync(iter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    it('returns the flat iterable', async () => {
      const iter = toAsyncIterable([
        'one', ['two']
      , 0, [1, [2]]
      ])

      const result = flattenAsync(iter)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([
        'o','n','e', 'two'
      , 0, 1, [2]
      ])
    })
  })
})
