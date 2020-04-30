import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { dropRight as call } from '@middleware/drop-right'
import { dropRight as pipe } from '@style/pipeline/middleware/drop-right'
import { dropRight as bind} from '@style/binding/middleware/drop-right'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('dropRight<T>(iterable: Iterable<T>, count: number): Iterable<T>', call)
, testPipe('dropRight<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('dropRight<T>(this: Iterable<T>, count: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::dropRight(count: number): IterableOperator<T>', IterableOperator.prototype.dropRight)
])('%s', (_, dropRight) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const count = 5

    const result = dropRight(iter, count)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = dropRight(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 3

        const result = dropRight(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('return iterable that dropped the last count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = dropRight(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1])
      })
    })
  })

  describe('count = 0', () => {
    it('return iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = dropRight(iter, count)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const count = -1

      const err = getError<InvalidArgumentError>(() => dropRight(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
