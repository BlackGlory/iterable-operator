import { getSyncError } from '@test/return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { zip as call } from '@body/zip'
import { zip as pipe } from '@style/pipeline/body/zip'
import { zip as bind } from '@style/binding/body/zip'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('zip', () => {
  describe.each([
    testCall('(...iterables: Iterable[]) -> Iterable', call)
  , testPipe('(...iterables: Iterable[]) -> (iterable: Iterable) -> Iterable', pipe)
  , testBind('(this: Iterable, iterables: Iterable[]) -> Iterable', bind)
  , testIterableChain('Operator::(...iterables: Iterable[]) -> Operator', IterableOperator.prototype.zip)
  ])('%s', (_, zip) => {
    describe('size(iterables) < 2', () => {
      it('throw InvalidArgumentsLengthError', () => {
        const iter = [1, 2, 3]

        const err = getSyncError<InvalidArgumentsLengthError>(() => zip(iter))

        expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
        expect(err!.message).toMatch('2')
      })
    })

    describe('size(iterables) >= 2', () => {
      it('lazy evaluation', () => {
        const iter1 = new MarkIterable()
        const iter2: unknown[] = []

        const result = zip(iter1, iter2)
        const isEval1 = iter1.isEvaluated()
        toArray(result)
        const isEval2 = iter1.isEvaluated()

        expect(isEval1).toBe(false)
        expect(isEval2).toBe(true)
      })

      describe('iterables have same size', () => {
        it('return zipped iterable', () => {
          const iter1 = [1, 2, 3]
          const iter2 = ['a', 'b', 'c']

          const result = zip(iter1, iter2)
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
        })
      })

      describe('iterables have not same size', () => {
        it('return zipped iterable by the shortest iterable', () => {
          const iter1 = [1, 2, 3]
          const iter2 = ['a', 'b']

          const result = zip(iter1, iter2)
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
        })
      })
    })
  })
})
