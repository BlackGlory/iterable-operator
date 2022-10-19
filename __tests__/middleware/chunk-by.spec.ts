import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { chunkBy } from '@middleware/chunk-by'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe(`
  chunkBy<T>(
    iterable: Iterable<T>
  , predicate: (element: T, index: number) => unknown
  ): IterableIterator<T[]>
`, () => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = chunkBy(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe('fn return true', () => {
    describe('chunk at middle', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const atTwo = (x: number) => x === 2

        const result = chunkBy(iter, atTwo)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('chunk at last', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const atThree = (x: number) => x === 3

        const result = chunkBy(iter, atThree)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('fn always return false', () => {
    it('return chunked iterable', () => {
      const iter = [1, 2, 3]
      const alwaysFalse = () => false

      const result = chunkBy(iter, alwaysFalse)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 2, 3]])
    })
  })

  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = (x: number) => !!x

    const result = chunkBy(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = chunkBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBe(customError)
    })
  })
})
