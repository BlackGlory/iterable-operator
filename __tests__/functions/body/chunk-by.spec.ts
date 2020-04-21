import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { chunkBy as call } from '@body/chunk-by'
import { chunkBy as pipe } from '@style/pipeline/body/chunk-by'
import { chunkBy as bind } from '@style/binding/body/chunk-by'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getSyncError } from '@test/return-style'

describe('chunkBy', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T[]>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean) -> (iterable: Iterable<T>) -> Iterable<T[]>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T[]>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> booolean) -> Operator<T[]>', IterableOperator.prototype.chunkBy)
  ])('%s', (_, chunkBy) => {
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

    describe('call', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const atTwo = (x: number) =>  x === 2

        const result = chunkBy(iter, atTwo)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [3]])
      })

      it('lazy evaluation', () => {
        const iter = new MarkIterable()
        const fn = jest.fn()

        const result = chunkBy(iter, fn)
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

        const result = chunkBy(iter, fn)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
