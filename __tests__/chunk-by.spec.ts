import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { chunkBy } from '@src/chunk-by'
import { getError } from 'return-style'

describe('chunkBy', () => {
  test('called fn with [element, index]', () => {
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

  describe('fn returns true', () => {
    describe('chunk at middle', () => {
      it('returns the chunked iterable', () => {
        const iter = [1, 2, 3]
        const atTwo = (x: number) => x === 2

        const result = chunkBy(iter, atTwo)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('chunk at last', () => {
      it('returns the chunked iterable', () => {
        const iter = [1, 2, 3]
        const atThree = (x: number) => x === 3

        const result = chunkBy(iter, atThree)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('fn always returns false', () => {
    it('returns the chunked iterable', () => {
      const iter = [1, 2, 3]
      const alwaysFalse = () => false

      const result = chunkBy(iter, alwaysFalse)
      const arrResult = toArray(result)

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

  describe('fn throws an error', () => {
    it('throws an error when consuming iterable', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = chunkBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })
})
