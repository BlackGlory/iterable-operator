import { getSyncError } from '@test/return-style'
import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { dropRightAsync as call } from '@body/drop-right-async'
import { dropRightAsync as pipe } from '@style/pipeline/body/drop-right-async'
import { dropRightAsync as bind } from '@style/binding/body/drop-right-async'
import { DropRightAsyncOperator } from '@style/chaining/body/drop-right-async'
import { InvalidArgumentError } from '@error'

describe('dropRightAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, count: number) -> AsyncIterable<T>', call)
  , testPipe('(count: number) -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>, count: number) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::dropRightAsync(count: number) -> AsyncIterableOperator<T>', DropRightAsyncOperator.prototype.dropRightAsync)
  ])('%s', (_, dropRightAsync) => {
    describe('count > 0', () => {
      describe('count > size(iterable)', () => {
        it('return empty iterable', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const count = 5

          const result = dropRightAsync(iter, count)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([])
        })
      })

      describe('count < size(iterable)', () => {
        it('return iterable that dropped the last count elements', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const count = 2

          const result = dropRightAsync(iter, count)
          const isIter = isAsyncIterable(result)
          const arrResult = await toArrayAsync(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([1])
        })
      })
    })

    describe('count = 0', () => {
      it('return iterable copy', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 0

        const result = dropRightAsync(iter, count)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })

    describe('count < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = -1

        const err = getSyncError<InvalidArgumentError>(() => dropRightAsync(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
