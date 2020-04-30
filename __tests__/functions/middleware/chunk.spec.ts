import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { chunk as call } from '@middleware/chunk'
import { chunk as pipe } from '@style/pipeline/middleware/chunk'
import { chunk as bind } from '@style/binding/middleware/chunk'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('chunk<T>(iterable: Iterable<T>, size: number): Iterable<T[]>', call)
, testPipe('chunk<T>(size: number): (iterable: Iterable<T>) => Iterable<T[]>', pipe)
, testBind('chunk<T>(this: Iterable<T>, size: number): Iterable<T[]>', bind)
, testIterableChain('IterableOperator<T>::chunk(size: number): IterableOperator<T[]>', IterableOperator.prototype.chunk)
])('%s', (_, chunk) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const size = 2

    const result = chunk(iter, size)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('size > 0', () => {
    it('return chunked iterable', () => {
      const iter = [1, 2, 3]
      const size = 2

      const result = chunk(iter, size)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([[1, 2], [3]])
    })
  })

  describe('size = 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const size = 0

      const err = getError<InvalidArgumentError>(() => chunk(iter, size))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('size')
    })
  })

  describe('size < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const size = -1

      const err = getError<InvalidArgumentError>(() => chunk(iter, size))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('size')
    })
  })
})
