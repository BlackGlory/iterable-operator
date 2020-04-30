import { toAsyncIterable, isAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { InvalidArgumentError } from '@src/error'
import { getError } from 'return-style'
import { takeRightAsync as call } from '@middleware/take-right-async'
import { takeRightAsync as pipe } from '@style/pipeline/middleware/take-right-async'
import { takeRightAsync as bind } from '@style/binding/middleware/take-right-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe.each([
  testCall('takeRightAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>', call)
, testPipe('takeRightAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('takeRightAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::takeRightAsync(count: number): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.takeRightAsync)
])('%s', (_, takeRightAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const count = 5

    const result = takeRightAsync(iter, count)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

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

      const err = getError<InvalidArgumentError>(() => takeRightAsync(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
