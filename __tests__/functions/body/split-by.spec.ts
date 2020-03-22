import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume } from '@test/utils'
import { splitBy as call } from '@body/split-by'
import { splitBy as pipe } from '@style/pipeline/body/split-by'
import { splitBy as bind } from '@style/binding/body/split-by'
import { SplitByOperator } from '@style/chaining/body/split-by'
import { getSyncError } from '@test/return-style'

describe('splitBy', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T[]>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean) -> (iterable: Iterable<T>) -> Iterable<T[]>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T[]>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> boolean) -> Operator<T[]>', SplitByOperator.prototype.splitBy)
  ])('%s', (_, splitBy) => {
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

    describe('call', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const atThree = (x: number) =>  x === 3

        const result = splitBy(iter, atThree)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3, 4, 5]
        const fn = () => { throw customError }

        const result = splitBy(iter, fn)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBe(customError)
      })
    })
  })
})
