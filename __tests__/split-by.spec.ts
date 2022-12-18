import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { splitBy } from '@src/split-by'
import { getError } from 'return-style'

describe('splitBy', () => {
  test('called fn with [element, index]', () => {
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

  describe('fn returns true', () => {
    describe('separator is first', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 1

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 3

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) => x === 5

        const result = splitBy(iter, atThree)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('fn alwasy returns false', () => {
    it('returns the splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const alwaysFalse = () => false

      const result = splitBy(iter, alwaysFalse)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = () => true

    const result = splitBy(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throws an error', () => {
    it('throws an error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3, 4, 5]
      const fn = () => { throw customError }

      const result = splitBy(iter, fn)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })
})
