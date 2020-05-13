import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { matchAsync as call } from '@output/match-async'
import { matchAsync as pipe } from '@style/pipeline/output/match-async'
import { matchAsync as bind } from '@style/binding/output/match-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('matchAsync<T>(iterable: AsyncItreable<T>, sequence: ArrayLike<T>): Promise<boolean>', call)
, testPipe('matchAsync<T>(sequence: ArrayLike<T>): (iterable: AsyncIterable<T>) => Promise<boolean>', pipe)
, testBind('matchAsync<T>(this: AsyncIterable<T>, sequence: ArrayLike<T>): Promise<boolean>', bind)
, testAsyncMethod('AsyncIterableOperator<T>::matchAsync(sequence: ArrayLike<T>): Promise<boolean>', AsyncIterableOperator.prototype.matchAsync)
])('%s', (_, matchAsync) => {
  describe('sequence isnt empty', () => {
    describe('sequence is matched', () => {
      it('return true', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq = [2, 3]

        const result = matchAsync(iter, seq)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('sequence isnt matched', () => {
      it('return false', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq = [3, 2]

        const result = matchAsync(iter, seq)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(false)
      })
    })
  })

  describe('sequence is empty', () => {
    it('return true', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const seq: number[] = []

      const result = matchAsync(iter, seq)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })
})
