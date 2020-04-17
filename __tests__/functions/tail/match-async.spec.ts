import { toAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncMethod } from '@test/test-fixtures'
import { isPromise } from 'extra-promise'
import { matchAsync as call } from '@tail/match-async'
import { matchAsync as pipe } from '@style/pipeline/tail/match-async'
import { matchAsync as bind } from '@style/binding/tail/match-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

describe('matchAsync', () => {
  describe.each([
    testCall('(iterable: AsyncItreable<T>, sequence: ArrayLike<T>) -> Promise<boolean>', call)
  , testPipe('(sequence: ArrayLike<T>) -> (iterable: AsyncIterable<T>) -> Promise<boolean>', pipe)
  , testBind('(this: AsyncIterable<T>, sequence: ArrayLike<T>) -> Promise<boolean>', bind)
  , testAsyncMethod('AsyncIterableOperator::matchAsync(sequence: ArrayLike<T>) -> Promise<boolean>', AsyncIterableOperator.prototype.matchAsync)
  ])('%s', (_, matchAsync) => {
    describe('sequence isnt empty', () => {
      describe('sequence is matched', () => {
        it('return true', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const seq = [2, 3]

          const result = matchAsync(iter, seq)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toBe(true)
        })
      })

      describe('sequence isnt matched', () => {
        it('return false', async () => {
          const iter = toAsyncIterable([1, 2, 3])
          const seq = [3, 2]

          const result = matchAsync(iter, seq)
          const isPro = isPromise(result)
          const proResult = await result

          expect(isPro).toBe(true)
          expect(proResult).toBe(false)
        })
      })
    })

    describe('sequence is empty', () => {
      it('return true', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq: number[] = []

        const result = matchAsync(iter, seq)
        const isPro = isPromise(result)
        const proResult = await result

        expect(isPro).toBe(true)
        expect(proResult).toBe(true)
      })
    })
  })
})
