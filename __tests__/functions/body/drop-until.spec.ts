import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { dropUntil as call } from '@body/drop-until'
import { dropUntil as pipe } from '@style/pipeline/body/drop-until'
import { dropUntil as bind } from '@style/binding/body/drop-until'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getSyncError } from '@test/return-style'

describe('dropUntil', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> boolean) -> Operator<T>', IterableOperator.prototype.dropUntil)
  ])('%s', (_, dropUntil) => {
    describe('fn is called', () => {
      it('called with [element,index]', () => {
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

      describe('return true on first element', () => {
        it('called once', () => {
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
    })

    describe('call', () => {
      it('return itreable that drop elements until fn return true', () => {
        const iter = [1, 2, 3]
        const atTwo = (x: number) => x === 2

        const result = dropUntil(iter, atTwo)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([2, 3])
      })

      it('lazy evaluation', () => {
        const iter = new MarkIterable()
        const fn = jest.fn()

        const result = dropUntil(iter, fn)
        const isEval1 = iter.isEvaluated()
        toArray(result)
        const isEval2 = iter.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = () => { throw customError }

        const result = dropUntil(iter, fn)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
