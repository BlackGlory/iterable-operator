import { describe, test, expect, it } from 'vitest'
import { getError } from 'return-style'
import { consume, toArray, MockIterable } from '@test/utils.js'
import { dropRight } from '@src/drop-right.js'

describe('dropRight', () => {
  test('lazy evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 1

    const result = dropRight(iter, count)
    const isEval1 = iter.nextIndex === 0
    consume(result)

    expect(isEval1).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('returns an empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('returns an empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 3

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('returns the iterable that dropped the last count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([1])
      })
    })
  })

  describe('count = 0', () => {
    it('returns the iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = dropRight(iter, count)
      const arrResult = toArray(result)

      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = [1, 2, 3]
      const count = -1

      const err = getError(() => dropRight(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
