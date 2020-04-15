import { toAsyncIterable, isAsyncIterable, toArrayAsync } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { InvalidArgumentError } from '@src/error'
import { getSyncError } from '@test/return-style'
import { takeRightAsync as call } from '@body/take-right-async'
import { takeRightAsync as pipe } from '@style/pipeline/body/take-right-async'
import { takeRightAsync as bind } from '@style/binding/body/take-right-async'
import { TakeRightAsyncOperator } from '@style/chaining/body/take-right-async'

describe('takeRightAsync', () => {
  describe.each([
    testCall('(iterable: AsyncIterable<T>, count: number) -> AsyncIterable<T>', call)
  , testPipe('(count: number) -> (iterable: AsyncIterable<T>) -> AsyncIterable<T>', pipe)
  , testBind('(this: AsyncIterable<T>, count: number) -> AsyncIterable<T>', bind)
  , testAsyncIterableChain('AsyncIterableOperator::takeRightAsync(count: number) -> AsyncIterableOperator<T>', TakeRightAsyncOperator.prototype.takeRightAsync)
  ])('%s', (_, takeRightAsync) => {
    describe('count > size(iterable)', () => {
      it('return iterable copy', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 5

        const result = takeRightAsync(iter, count)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })

    describe('0 < count < size(iterable)', () => {
      it('return iterable that taken the first count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = takeRightAsync(iter, count)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([2, 3])
      })
    })

    describe('count = 0', () => {
      it('throw empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 0

        const result = takeRightAsync(iter, count)
        const isIter = isAsyncIterable(result)
        const arrResult = await toArrayAsync(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('count < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([])
        const count = -1

        const err = getSyncError<InvalidArgumentError>(() => takeRightAsync(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
