import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { getError } from 'return-style'
import { takeRight as call } from '@middleware/take-right'
import { takeRight as pipe } from '@style/pipeline/middleware/take-right'
import { takeRight as bind } from '@style/binding/middleware/take-right'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('takeRight<T>(iterable: Iterable<T>, count: number): Iterable<T>', call)
, testPipe('takeRight<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('takeRight<T>(this: Iterable<T>, count: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::takeRight(count: number): IterableOperator<T>', IterableOperator.prototype.takeRight)
])('%s', (_, takeRight) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const count = 5

    const result = takeRight(iter, count)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('return iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 5

      const result = takeRight(iter, count)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('return iterable that taken last count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = takeRight(iter, count)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([2, 3])
    })
  })

  describe('count = 0', () => {
    it('throw empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = takeRight(iter, count)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter: number[] = []
      const count = -1

      const err = getError<InvalidArgumentError>(() => takeRight(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
