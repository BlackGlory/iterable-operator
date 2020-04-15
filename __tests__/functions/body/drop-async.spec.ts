import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@src/error'
import { dropAsync as call } from '@body/drop-async'
import { dropAsync as pipe } from '@style/pipeline/body/drop-async'
import { dropAsync as bind } from '@style/binding/body/drop-async'
import { DropAsyncOperator } from '@style/chaining/body/drop-async'

describe('dropAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, count: number) -> AsyncIterable<T>', call)
  , testPipe('(count: number) -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>, count: number) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::dropAsync(count: number) -> AsyncIterableOperator<T>', DropAsyncOperator.prototype.dropAsync)
  ])('%s', (_, dropAsync) => {
    describe('count > 0', () => {
      it('return iterable that dropped the first count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = dropAsync(iter, count)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([3])
      })
    })

    describe('count = 0', () => {
      it('return iterable copy', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 0

        const result = dropAsync(iter, count)
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

        const err = getSyncError<InvalidArgumentError>(() => dropAsync(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
