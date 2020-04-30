import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { sliceAsync as call } from '@middleware/slice-async'
import { sliceAsync as pipe } from '@style/pipeline/middleware/slice-async'
import { sliceAsync as bind } from '@style/binding/middleware/slice-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe.each([
  testCall('sliceAsync<T>(iterable: AsyncIterable<T>, start: number, end: number): AsyncIterable<T>', call)
, testPipe('sliceAsync<T>(start: number, end: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('sliceAsync<T>(this: AsyncIterable<T>, start: number, end: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::sliceAsync(start: number, end: number): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.sliceAsync)
])('%s', (_, sliceAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const start = 0
    const end = 10

    const result = sliceAsync(iter, start, end)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('start < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const start = -1
      const end = 1

      const err = getError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

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

          const err = getError<InvalidArgumentError>(() => sliceAsync(iter, start, end))

          expect(err).toBeInstanceOf(InvalidArgumentError)
          expect(err!.message).toMatch('end')
        })
      })
    })
  })
})
