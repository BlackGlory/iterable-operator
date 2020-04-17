import { getSyncError } from '@test/return-style'
import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { chunkAsync as call } from '@body/chunk-async'
import { chunkAsync as pipe } from '@style/pipeline/body/chunk-async'
import { chunkAsync as bind } from '@style/binding/body/chunk-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'

describe('chunkAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, size: number) -> AsyncIterable<T[]>', call)
  , testPipe('(size: number) -> (iterable: AsyncIterable<T>) -> AsyncIterable<T[]>', pipe)
  , testBind('(this: AsyncIterable<T>, size: number) -> AsyncIterable<T[]>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::chunkAsync(size: number) -> AsyncIterableOperator<T[]>', AsyncIterableOperator.prototype.chunkAsync)
  ])('%s', (_, chunkAsync) => {
    describe('size > 0', () => {
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

    describe('size = 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = 0

        const err = getSyncError<InvalidArgumentError>(() => chunkAsync(iter, size))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('size')
      })
    })

    describe('size < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([1, 2, 3])
        const size = -1

        const err = getSyncError<InvalidArgumentError>(() => chunkAsync(iter, size))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('size')
      })
    })
  })
})
