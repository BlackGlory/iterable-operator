import { describe, test, expect, it } from 'vitest'
import { getError } from 'return-style'
import { consume, toArray, MockIterable, take } from '@test/utils.js'
import { flattenDeep } from '@src/flatten-deep.js'

describe('flattenDeep', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const depth = Infinity

    const result = flattenDeep(iter, depth)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('returns the empty iterable', () => {
      const iter: number[] = []
      const depth = Infinity

      const result = flattenDeep(iter, depth)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    describe('iterable is string', () => {
      it('returns the iterable chars', () => {
        const iter = '123'
        const depth = Infinity

        const result = flattenDeep(iter, depth)
        const arrResult = toArray(result)

        expect(arrResult).toEqual(['1', '2', '3'])
      })
    })

    describe('iterable isnt string', () => {
      describe('depth < 0', () => {
        it('throws an error', () => {
          const iter: number[] = []
          const depth = -1

          const err = getError(() => flattenDeep(iter, depth))

          expect(err).toBeInstanceOf(Error)
          expect(err!.message).toMatch('depth')
        })
      })

      describe('depth = 0', () => {
        it('returns the iterable copy', () => {
          const iter = [0, [1]]
          const depth = 0

          const result = flattenDeep(iter, depth)
          const arrResult = toArray(result)

          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('depth > 0', () => {
        it('returns the flat iterable', () => {
          const iter = [
            'one', ['two', ['three']]
          , 0, [1, [2, [3]]]
          ]
          const depth = 2

          const result = flattenDeep(iter, depth)
          const arrResult = toArray(result)

          expect(arrResult).toEqual([
            'o','n','e', 't','w','o', 'three'
          , 0, 1, 2, [3]
          ])
        })
      })
    })
  })
})
