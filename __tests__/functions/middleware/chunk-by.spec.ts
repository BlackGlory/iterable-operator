import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, getCalledTimes, consume, MarkIterable } from '@test/utils'
import { chunkBy as call } from '@middleware/chunk-by'
import { chunkBy as pipe } from '@style/pipeline/middleware/chunk-by'
import { chunkBy as bind } from '@style/binding/middleware/chunk-by'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { getError } from 'return-style'

describe.each([
  testCall('chunkBy<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', call)
, testPipe('chunkBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>', pipe)
, testBind('chunkBy<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', bind)
, testIterableChain('IterableOperator<T>::chunkBy(fn: (element: T, index: number) => booolean): IterableOperator<T[]>', IterableOperator.prototype.chunkBy)
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

  describe('fn return true', () => {
    describe('chunk at middle', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const atTwo = (x: number) => x === 2

        const result = chunkBy(iter, atTwo)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('chunk at last', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const atThree = (x: number) => x === 3

        const result = chunkBy(iter, atThree)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('fn always return false', () => {
    it('return chunked iterable', () => {
      const iter = [1, 2, 3]
      const alwaysFalse = () => false

      const result = chunkBy(iter, alwaysFalse)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([[1, 2, 3]])
    })
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

  describe('fn throw error', () => {
    it('throw error when consume', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const result = chunkBy(iter, fn)
      const isIter = isIterable(result)
      const err = getError(() => toArray(result))

      expect(isIter).toBe(true)
      expect(err).toBe(customError)
    })
  })
})
