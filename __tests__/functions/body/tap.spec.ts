import { getSyncError } from '@test/return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { tap as call } from '@body/tap'
import { tap as pipe } from '@style/pipeline/body/tap'
import { tap as bind } from '@style/binding/body/tap'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('tap', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> unknown) -> Iterable<T>', call)
  , testPipe('(fn: (element: T, index: number) -> unknown) -> (iterable: Iterable) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> unknown) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> unknown) -> Operator<T>', IterableOperator.prototype.tap)
  ])('%s', (_, tap) => {
    describe('fn is called', () => {
      it('called with [element,index]', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn()

        const result = tap(iter, fn)
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
      it('call fn and return iterable', () => {
        const iter = [1, 2, 3]
        const sideResult: Array<[number, number]> = []
        const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

        const result = tap(iter, pushToSideResult)
        const isIter = isIterable(result)
        const isSideResultEmptyInStage1 = !sideResult.length
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(isSideResultEmptyInStage1).toBe(true)
        expect(arrResult).toEqual([1, 2, 3])
        expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
      })

      it('lazy evaluation', () => {
        const iter = new MarkIterable()
        const fn = jest.fn()

        const result = tap(iter, fn)
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
        const justThrow = () => { throw new Error('CustomError') }

        const result = tap(iter, justThrow)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBeInstanceOf(Error)
        expect(err!.message).toMatch('CustomError')
      })
    })
  })
})
