import { isAsyncIterable, toArrayAsync, toAsyncIterable, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { takeAsync as call } from '@middleware/take-async'
import { takeAsync as pipe } from '@style/pipeline/middleware/take-async'
import { takeAsync as bind } from '@style/binding/middleware/take-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe.each([
  testCall('takeAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>', call)
, testPipe('takeAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('takeAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::takeAsync(count: number): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.takeAsync)
])('%s', (_, takeAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const count = 5

    const result = takeAsync(iter, count)
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

      const result = takeAsync(iter, count)
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

      const result = takeAsync(iter, count)
      const isIter = isAsyncIterable(result)
      const arrResult = await toArrayAsync(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = takeAsync(iter, count)
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

      const err = getError<InvalidArgumentError>(() => takeAsync(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
