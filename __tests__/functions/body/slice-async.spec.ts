import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@src/error'
import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { sliceAsync as call } from '@body/slice-async'
import { sliceAsync as pipe } from '@style/pipeline/body/slice-async'
import { sliceAsync as bind } from '@style/binding/body/slice-async'
import { SliceAsyncOperator } from '@style/chaining/body/slice-async'

describe('sliceAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, start: number, end: number) -> AsyncIterable<T>', call)
  , testPipe('(start: number, end: number) -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>, start: number, end: number) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::sliceAsync(start: number, end: number) -> AsyncIterableOperator<T>', SliceAsyncOperator.prototype.sliceAsync)
  ])('%s', (_, sliceAsync) => {
    describe('start < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([1, 2, 3])
        const start = -1
        const end = 1

        const err = getSyncError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('start')
      })
    })

    describe('start >= 0', () => {
      describe('start >= size(iterable', () => {
        it('return empty iterable', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const start = 3
          const end = 5

          const result = sliceAsync(iter, start, end)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([])
        })
      })

      describe('start < size(iterable)', () => {
        describe('start < end', () => {
          it('return iterable[start:end-1]', async () => {
            const iter = toAsyncIterable([1, 2, 3])
            const start = 1
            const end = 2

            const result = sliceAsync(iter, start, end)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([2])
          })
        })

        describe('start = end', () => {
          it('return empty iterable', async () => {
            const iter = toAsyncIterable([1, 2, 3])
            const start = 1
            const end = 1

            const result = sliceAsync(iter, start, end)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([])
          })
        })

        describe('start > end', () => {
          it('throw InvalidArgumentError', async () => {
            const iter = toAsyncIterable([1, 2, 3])
            const start = 2
            const end = 1

            const err = getSyncError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

            expect(err).toBeInstanceOf(InvalidArgumentError)
            expect(err!.message).toMatch('end')
          })
        })
      })
    })
  })
})
