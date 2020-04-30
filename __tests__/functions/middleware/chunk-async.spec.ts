import { getError } from 'return-style'
import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { chunkAsync as call } from '@middleware/chunk-async'
import { chunkAsync as pipe } from '@style/pipeline/middleware/chunk-async'
import { chunkAsync as bind } from '@style/binding/middleware/chunk-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'

describe.each([
  testCall('chunkAsync<T>(iterable: AsyncIterable<T>, size: number): AsyncIterable<T[]>', call)
, testPipe('chunkAsync<T>(size: number): (iterable: AsyncIterable<T>) => AsyncIterable<T[]>', pipe)
, testBind('chunkAsync<T>(this: AsyncIterable<T>, size: number): AsyncIterable<T[]>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::chunkAsync(size: number): AsyncIterableOperator<T[]>', AsyncIterableOperator.prototype.chunkAsync)
])('%s', (_, chunkAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const size = 2

    const result = chunkAsync(iter, size)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('size > 0', () => {
    describe('size = size(iterable)', () => {
      it('return chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 3

        const result = chunkAsync(iter, size)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })

    describe('size < size(iterable)', () => {
      it('return chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 2

        const result = chunkAsync(iter, size)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('size > size(iterable)', () => {
      it('return chunked iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 5

        const result = chunkAsync(iter, size)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2, 3]])
      })
    })
  })

  describe('size = 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const size = 0

      const err = getError<InvalidArgumentError>(() => chunkAsync(iter, size))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('size')
    })
  })

  describe('size < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const size = -1

      const err = getError<InvalidArgumentError>(() => chunkAsync(iter, size))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('size')
    })
  })
})
