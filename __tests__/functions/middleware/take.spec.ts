import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { getError } from 'return-style'
import { take as call } from '@middleware/take'
import { take as pipe } from '@style/pipeline/middleware/take'
import { take as bind } from '@style/binding/middleware/take'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('take<T>(iterable: Iterable<T>, count: number): Iterable<T>', call)
, testPipe('take<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('take<T>(iterable: Iterable<T>, count: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::take(count: number): IterableOperator<T>', IterableOperator.prototype.take)
])('%s', (_, take) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const count = 5

    const result = take(iter, count)
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

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('return iterable that take first count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('return empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter: number[] = []
      const count = -1

      const err = getError<InvalidArgumentError>(() => take(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
