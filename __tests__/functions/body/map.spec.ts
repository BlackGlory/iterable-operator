import { getSyncError } from '@test/return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { map as call } from '@body/map'
import { map as pipe } from '@style/pipeline/body/map'
import { map as bind } from '@style/binding/body/map'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('map', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> U) -> Iterable<U>', call)
  , testPipe('(fn: (element: T, index: number) -> U) -> (iterable: Iterable<T>) -> Iterable<U>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> U) -> Iterable<U>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> U) -> Operator<T>', IterableOperator.prototype.map)
  ])('%s', (_, map) => {
    describe('fn called', () => {
      it('called with [element,index]', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn()

        const result = map(iter, fn)
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

    describe('call', () => {
      it('return mapped iterable', () => {
        const iter = [1, 2, 3]
        const double = (x: number) => x * 2

        const result = map(iter, double)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([2, 4, 6])
      })

      it('lazy evaluation', () => {
        const iter = new MarkIterable()
        const fn = jest.fn()

        const result = map(iter, fn)
        const isEval1 = iter.isEvaluated()
        toArray(result)
        const isEval2 = iter.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', () => {
        const iter = [1, 2, 3]
        const fn = () => { throw new Error('CustomError') }

        const result = map(iter, fn)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBeInstanceOf(Error)
        expect(err!.message).toMatch('CustomError')
      })
    })
  })
})
