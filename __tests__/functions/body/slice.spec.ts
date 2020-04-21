import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { getSyncError } from '@test/return-style'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { slice as call } from '@body/slice'
import { slice as pipe } from '@style/pipeline/body/slice'
import { slice as bind } from '@style/binding/body/slice'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('slice', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, start: number, end: number) -> Iterable<T>', call)
  , testPipe('(start: number, end: number) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, start: number, end: number) -> Iterable<T>', bind)
  , testIterableChain('Opeator<T>::(start: number, end: number) -> Operator<T>', IterableOperator.prototype.slice)
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

        const err = getSyncError<InvalidArgumentError>(() => slice(iter, start, end))

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
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
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
            const isIter = isIterable(result)
            const arrResult = toArray(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([2])
          })
        })

        describe('start = end', () => {
          it('return empty iterable', () => {
            const iter = [1, 2, 3]
            const start = 1
            const end = 1

            const result = slice(iter, start, end)
            const isIter = isIterable(result)
            const arrResult = toArray(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([])
          })
        })

        describe('start > end', () => {
          it('throw InvalidArgumentError', () => {
            const iter = [1, 2, 3]
            const start = 2
            const end = 1

            const err = getSyncError<InvalidArgumentError>(() => slice(iter, start, end))

            expect(err).toBeInstanceOf(InvalidArgumentError)
            expect(err!.message).toMatch('end')
          })
        })
      })
    })
  })
})
