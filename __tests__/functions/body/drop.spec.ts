import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { drop as call } from '@body/drop'
import { drop as pipe } from '@style/pipeline/body/drop'
import { drop as bind } from '@style/binding/body/drop'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('drop', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, count: number) -> Iterable<T>', call)
  , testPipe('(count: number) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, count: number) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(count: number) -> Operator<T>', IterableOperator.prototype.drop)
  ])('%s', (_, drop) => {
    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const count = 2

      const result = drop(iter, count)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })

    describe('count > 0', () => {
      it('return iterable that dropped the first count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = drop(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([3])
      })
    })

    describe('count = 0', () => {
      it('return iterable copy', () => {
        const iter = [1, 2, 3]
        const count = 0

        const result = drop(iter, count)
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

        const err = getSyncError<InvalidArgumentError>(() => drop(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
