import { toArray, getCalledTimes, consume, MockIterable, take } from '@test/utils'
import { dropUntil } from '@src/drop-until'
import { getError } from 'return-style'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('dropUntil', () => {
  test('close the unexhausted iterator', () => {
    const iter = new MockIterable(go(function* () {
     throw new Error()
    }))

    try {
      consume(dropUntil(iter, () => true))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = jest.fn().mockReturnValue(false)

    const result = dropUntil(iter, fn)
    const calledTimesBeforeConsume = getCalledTimes(fn)
    consume(result)
    const calledTimesAfterConsume = getCalledTimes(fn)

    expect(calledTimesBeforeConsume).toBe(0)
    expect(calledTimesAfterConsume).toBe(3)
    expect(fn).nthCalledWith(1, 1, 0)
    expect(fn).nthCalledWith(2, 2, 1)
    expect(fn).nthCalledWith(3, 3, 2)
  })

  describe('fn returns true on first element', () => {
    it('called fn only once', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn().mockReturnValueOnce(true)

      const result = dropUntil(iter, fn)
      const calledTimesBeforeConsume = getCalledTimes(fn)
      consume(result)
      const calledTimesAfterConsume = getCalledTimes(fn)

      expect(calledTimesBeforeConsume).toBe(0)
      expect(calledTimesAfterConsume).toBe(1)
    })
  })

  it('returns the itreable that drop elements until fn returns true', () => {
    const iter = [1, 2, 3]
    const atTwo = (x: number) => x === 2

    const result = dropUntil(iter, atTwo)
    const arrResult = toArray(result)

    expect(result).toBeIterable()
    expect(arrResult).toEqual([2, 3])
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const fn = (x: number) => x === 2

    const result = dropUntil(iter, fn)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 2

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('fn throws an error', () => {
    it('throws an error when consuming iterable', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = dropUntil(iter, fn)
      const err = getError(() => toArray(result))

      expect(result).toBeIterable()
      expect(err).toBe(customError)
    })
  })
})
