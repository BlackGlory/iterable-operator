import { getError } from 'return-style'
import { InvalidArgumentsLengthError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { concat as call } from '@middleware/concat'
import { concat as pipe } from '@style/pipeline/middleware/concat'
import { concat as bind } from '@style/binding/middleware/concat'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('concat<T>(...iterables: Array<Iterable<unknown>>): Iterable<T>', call)
, testPipe('concat<T>(...iterables: Array<Iterable<unknown>>): (iterable: Iterable<unknown>) => Iterable<T>', pipe)
, testBind('concat<T>(this: Iterable, ...iterables: Array<Iterable<unknown>>): Iterable<T>', bind)
, testIterableChain('IterableOperator<unknown>::concat<T>(...iterables: Array<Iterable<unknown>>): Iterable<T>', IterableOperator.prototype.concat)
])('%s', (_, concat) => {
  it('lazy evaluation', () => {
    const iter1 = new MarkIterable()
    const iter2: unknown[] = []

    const result = concat(iter1, iter2)
    const isEval1 = iter1.isEvaluated()
    toArray(result)
    const isEval2 = iter1.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => concat(iter))

      expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
      expect(err!.message).toMatch('2')
    })
  })

  describe('size(iterables) >= 2', () => {
    it('return concated iterable', () => {
      const iter1 = [1, 2, 3]
      const iter2 = ['a', 'b', 'c']

      const result = concat(iter1, iter2)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
    })
  })
})
