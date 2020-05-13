import { toAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { dropAsync as call } from '@middleware/drop-async'
import { dropAsync as pipe } from '@style/pipeline/middleware/drop-async'
import { dropAsync as bind } from '@style/binding/middleware/drop-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('dropAsync<T>(iterable: AsyncIterable<T>, count: number): AsyncIterable<T>', call)
, testPipe('dropAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('dropAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::dropAsync(count: number): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.dropAsync)
])('%s', (_, dropAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const count = 2

    const result = dropAsync(iter, count)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 5

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('return empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 3

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('return iterable that dropped the first count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([3])
      })
    })
  })

  describe('count = 0', () => {
    it('return iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = dropAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = -1

      const err = getError<InvalidArgumentError>(() => dropAsync(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
