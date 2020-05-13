import { InvalidArgumentError } from '@src/error'
import { toAsyncIterable, toArrayAsync, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { getError } from 'return-style'
import { flattenDeepAsync as call } from '@middleware/flatten-deep-async'
import { flattenDeepAsync as pipe } from '@style/pipeline/middleware/flatten-deep-async'
import { flattenDeepAsync as bind } from '@style/binding/middleware/flatten-deep-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('flattenDeepAsync<T>(iterable: AsyncIterable<unknown>, depth: number): AsyncIterable<T>', call)
, testPipe('flattenDeepAsync<T>(depth: number): (iterable: AsyncIterable<unknown>) => AsyncIterable<T>', pipe)
, testBind('flattenDeepAsync<T>(this: AsyncIterable<unknown>, depth: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<unknown>::flattenDeepAsync<T>(depth: number): AsyncIterableOperator<T>', AsyncIterableOperator.prototype.flattenDeepAsync)
])('%s', (_, flattenDeepAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const depth = Infinity

    const result = flattenDeepAsync(iter, depth)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('iterable is empty', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([])
      const depth = Infinity

      const result = flattenDeepAsync(iter, depth)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    describe('depth < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = toAsyncIterable([])
        const depth = -1

        const err = getError<InvalidArgumentError>(() => flattenDeepAsync(iter, depth))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('depth')
      })
    })

    describe('depth = 0', () => {
      it('return iterable copy', async () => {
        const iter = toAsyncIterable([0, [1]])
        const depth = 0

        const result = flattenDeepAsync(iter, depth)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([0, [1]])
      })
    })

    describe('depth > 0', () => {
      it('return flat iterable', async () => {
        const iter = toAsyncIterable([
          'one', ['two', ['three']]
        , 0, [1, [2, [3]]]
        ])
        const depth = 2

        const result = flattenDeepAsync(iter, depth)
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([
          'o','n','e', 't','w','o', 'three'
        , 0, 1, 2, [3]
        ])
      })
    })
  })
})
