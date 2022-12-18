import { getError } from 'return-style'
import { consume, toArray, MockIterable, take } from '@test/utils'
import { chunk } from '@src/chunk'

describe('chunk', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const size = 1

    const result = chunk(iter, size)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('size > 0', () => {
    describe('size = size(iterable)', () => {
      it('returns the chunked iterable', () => {
        const iter = [1, 2, 3]
        const size = 3

        const result = chunk(iter, size)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })

    describe('size < size(iterable)', () => {
      it('returns the chunked iterable', () => {
        const iter = [1, 2, 3]
        const size = 2

        const result = chunk(iter, size)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('size > size(iterable)', () => {
      it('returns the chunked iterable', () => {
        const iter = [1, 2, 3]
        const size = 5

        const result = chunk(iter, size)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('size = 0', () => {
    it('throws an error', () => {
      const iter = [1, 2, 3]
      const size = 0

      const err = getError(() => chunk(iter, size))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('size')
    })
  })

  describe('size < 0', () => {
    it('throws an error', () => {
      const iter = [1, 2, 3]
      const size = -1

      const err = getError(() => chunk(iter, size))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('size')
    })
  })
})
