import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { splitBy } from '@middleware/split-by'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'

describe('splitBy<T>(iterable: Iterable<T>, predicate: (element: T, index: number) => unknown): Iterable<T[]>', () => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      const result = splitBy(iter, fn)
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
    describe('separator is first', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 1

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 3

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 5

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('fn always return false', () => {
    it('return splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const alwaysFalse = () => false

      const result = splitBy(iter, alwaysFalse)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = () => true

    const result = splitBy(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3, 4, 5]
      const fn = () => { throw customError }

      const result = splitBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBe(customError)
    })
  })
})
