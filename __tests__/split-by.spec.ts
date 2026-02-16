import { describe, test, it, expect, vi } from 'vitest'
import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils.js'
import { splitBy } from '@src/split-by.js'
import { getError } from 'return-style'

describe('splitBy', () => {
  test('called predicate with [element, index]', () => {
    const iter = [1, 2, 3]
    const predicate = vi.fn()

    const result = splitBy(iter, predicate)
    const calledTimesBeforeConsume = getCalledTimes(predicate)
    consume(result)
    const calledTimesAfterConsume = getCalledTimes(predicate)

    expect(calledTimesBeforeConsume).toBe(0)
    expect(calledTimesAfterConsume).toBe(3)
    expect(predicate).nthCalledWith(1, 1, 0)
    expect(predicate).nthCalledWith(2, 2, 1)
    expect(predicate).nthCalledWith(3, 3, 2)
  })

  describe('predicate returns true', () => {
    describe('separator is first', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const predicate = (x: number) => x === 1

        const result = splitBy(iter, predicate)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const predicate = (x: number) => x === 3

        const result = splitBy(iter, predicate)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const predicate = (x: number) => x === 5

        const result = splitBy(iter, predicate)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('predicate alwasy returns false', () => {
    it('returns the splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const predicate = () => false

      const result = splitBy(iter, predicate)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const predicate = () => true

    const result = splitBy(iter, predicate)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('predicate throws an error', () => {
    it('throws an error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3, 4, 5]
      const predicate = () => { throw customError }

      const result = splitBy(iter, predicate)
      const err = getError(() => toArray(result))

      expect(err).toBe(customError)
    })
  })

  test('edge: empty iterable', () => {
    const iter: number[] = []
    const predicate = () => true

    const result = splitBy(iter, predicate)
    const arrResult = toArray(result)

    expect(arrResult).toEqual([[]])
  })
})
