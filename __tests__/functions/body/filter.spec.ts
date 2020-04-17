import { getSyncError } from '@test/return-style'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume } from '@test/utils'
import { filter as call } from '@body/filter'
import { filter as pipe } from '@style/pipeline/body/filter'
import { filter as bind } from '@style/binding/body/filter'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('filter', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T>', call)
  , testPipe('(fn: (element: T, index: number) -> boolean) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> boolean) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(fn: (element: T, index: number) -> boolean) -> Operator<T>', IterableOperator.prototype.filter)
  ])('%s', (_, filter) => {
    describe('fn is called', () => {
      it('called with [element,index]', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn()

        const result = filter(iter, fn)
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
      it('return filtered iterable', () => {
        const iter = [1, 2, 3]
        const odd = (x: number) => x % 2 === 1

        const result = filter(iter, odd)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 3])
      })
    })

    describe('fn throw error', () => {
      it('throw error when consume', () => {
        const iter = [1, 2, 3]
        const fn = () => { throw new Error('CustomError') }

        const result = filter(iter, fn)
        const isIter = isIterable(result)
        const err = getSyncError(() => toArray(result))

        expect(isIter).toBe(true)
        expect(err).toBeInstanceOf(Error)
        expect(err!.message).toMatch('CustomError')
      })
    })
  })
})
