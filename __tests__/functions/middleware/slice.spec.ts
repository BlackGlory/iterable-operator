import { getError } from 'return-style'
import { consume, toArray, MockIterable, take } from '@test/utils'
import { slice } from '@middleware/slice'
import '@blackglory/jest-matchers'

describe(`
  slice<T>(iterable: Iterable<T>, start: number, end: number): Iterable<T>
`, () => {
  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const start = 0
    const end = 10

    const result = slice(iter, start, end)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('start < 0', () => {
    it('throw Error', () => {
      const iter = [1, 2, 3]
      const start = -1
      const end = 1

      const err = getError(() => slice(iter, start, end))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('start')
    })
  })

  describe('start >= 0', () => {
    describe('start >= size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const start = 3
        const end = 5

        const result = slice(iter, start, end)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('start < size(iterable)', () => {
      describe('start < end', () => {
        it('return iterable[start:end-1]', () => {
          const iter = [1, 2, 3]
          const start = 1
          const end = 2

          const result = slice(iter, start, end)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(arrResult).toEqual([2])
        })
      })

      describe('start = end', () => {
        it('return empty iterable', () => {
          const iter = [1, 2, 3]
          const start = 1
          const end = 1

          const result = slice(iter, start, end)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('start > end', () => {
        it('throw Error', () => {
          const iter = [1, 2, 3]
          const start = 2
          const end = 1

          const err = getError(() => slice(iter, start, end))

          expect(err).toBeInstanceOf(Error)
          expect(err!.message).toMatch('end')
        })
      })
    })
  })
})
