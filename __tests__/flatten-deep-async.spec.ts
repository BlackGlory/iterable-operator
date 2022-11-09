import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync }
  from '@test/utils'
import { getError } from 'return-style'
import { flattenDeepAsync } from '@src/flatten-deep-async'
import '@blackglory/jest-matchers'

describe('flattenDeepAsync', () => {
  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const depth = Infinity

    const result = flattenDeepAsync(iter, depth)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const iaPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(iaPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('returns the empty iterable', async () => {
      const iter = toAsyncIterable([])
      const depth = Infinity

      const result = flattenDeepAsync(iter, depth)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    describe('depth < 0', () => {
      it('throws an error', () => {
        const iter = toAsyncIterable([])
        const depth = -1

        const err = getError(() => flattenDeepAsync(iter, depth))

        expect(err).toBeInstanceOf(Error)
        expect(err!.message).toMatch('depth')
      })
    })

    describe('depth = 0', () => {
      it('returns the iterable copy', async () => {
        const iter = toAsyncIterable([0, [1]])
        const depth = 0

        const result = flattenDeepAsync(iter, depth)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([0, [1]])
      })
    })

    describe('depth > 0', () => {
      it('returns the flat iterable', async () => {
        const iter = toAsyncIterable([
          'one', ['two', ['three']]
        , 0, [1, [2, [3]]]
        ])
        const depth = 2

        const result = flattenDeepAsync(iter, depth)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([
          'o','n','e', 't','w','o', 'three'
        , 0, 1, 2, [3]
        ])
      })
    })
  })
})
