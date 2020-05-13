import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { getError } from 'return-style'
import { toArray, MarkIterable } from '@test/utils'
import { slice as call } from '@middleware/slice'
import { slice as pipe } from '@style/pipeline/middleware/slice'
import { slice as bind } from '@style/binding/middleware/slice'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('slice<T>(iterable: Iterable<T>, start: number, end: number): Iterable<T>', call)
, testPipe('slice<T>(start: number, end: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('slice<T>(this: Iterable<T>, start: number, end: number): Iterable<T>', bind)
, testIterableChain('IterableOpeator<T>::slice(start: number, end: number): IterableOperator<T>', IterableOperator.prototype.slice)
])('%s', (_, slice) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const start = 0
    const end = 10

    const result = slice(iter, start, end)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('start < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const start = -1
      const end = 1

      const err = getError<InvalidArgumentError>(() => slice(iter, start, end))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('start')
    })
  })

  describe('start >= 0', () => {
    describe('start >= size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const start = 3
        const end = 5

        const result = slice(iter, start, end)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('start < size(iterable)', () => {
      describe('start < end', () => {
        it('return iterable[start:end-1]', () => {
          const iter = [1, 2, 3]
          const start = 1
          const end = 2

          const result = slice(iter, start, end)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(arrResult).toEqual([2])
        })
      })

      describe('start = end', () => {
        it('return empty iterable', () => {
          const iter = [1, 2, 3]
          const start = 1
          const end = 1

          const result = slice(iter, start, end)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(arrResult).toEqual([])
        })
      })

      describe('start > end', () => {
        it('throw InvalidArgumentError', () => {
          const iter = [1, 2, 3]
          const start = 2
          const end = 1

          const err = getError<InvalidArgumentError>(() => slice(iter, start, end))

          expect(err).toBeInstanceOf(InvalidArgumentError)
          expect(err!.message).toMatch('end')
        })
      })
    })
  })
})
