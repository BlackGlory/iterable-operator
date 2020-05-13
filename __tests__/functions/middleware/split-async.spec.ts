import { toAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { splitAsync as call } from '@middleware/split-async'
import { splitAsync as pipe } from '@style/pipeline/middleware/split-async'
import { splitAsync as bind } from '@style/binding/middleware/split-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('splitAsync<T>(iterable: AsyncIterable<T>, separator: T): AsyncIterable<T[]>', call)
, testPipe('splitAsync<T>(separator: T): (iterable: AsyncIterable<T>)', pipe)
, testBind('splitAsync<T>(this: AsyncIterable<T>, separator: T): AsyncIterable<T[]>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::splitAsync(separator: T): AsyncIterableOperator<T[]>', AsyncIterableOperator.prototype.splitAsync)
])('%s', (_, splitAsync) => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 1

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 3

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('return splited iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3, 4, 5])
        const sep = 5

        const result = splitAsync(iter, sep)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('separator not in iterable', () => {
    it('return splited iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3, 4, 5])
      const sep = 0

      const result = splitAsync(iter, sep)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const sep = 3

    const result = splitAsync(iter, sep)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })
})
