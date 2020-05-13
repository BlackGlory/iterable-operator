import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { zip as call } from '@middleware/zip'
import { zip as pipe } from '@style/pipeline/middleware/zip'
import { zip as bind } from '@style/binding/middleware/zip'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('zip<T>(...iterables: Array<Iterable<unknown>>): Iterable<T>', call)
, testPipe('zip<T>(...iterables: Array<Iterable<unknown>>): (iterable: Iterable<unknown>) => Iterable<T>', pipe)
, testBind('zip<T>(this: Iterable, ...iterables: Array<Iterable<unknown>>): Iterable<T>', bind)
, testIterableChain('IterableOperator<unknown>::zip<T>(...iterables: Array<Iterable<unknown>>): IterableOperator<T>', IterableOperator.prototype.zip)
])('%s', (_, zip) => {
  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => zip(iter))

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
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
      })
    })

    describe('iterables have not same size', () => {
      it('return zipped iterable by the shortest iterable', () => {
        const iter1 = [1, 2, 3]
        const iter2 = ['a', 'b']

        const result = zip(iter1, iter2)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
      })
    })
  })
})
