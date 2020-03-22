import { getSyncError } from '@test/return-style'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable } from '@test/utils'
import { InvalidArgumentsLengthError } from '@error'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'

const concatAsync = iterableChainAsync(IterableOperator.prototype.concatAsync)
const getIter = toIterable

describe('IterableOperator::concatAsync', () => {
  describe('(...iterables: Array<Itereable | AsyncIterable>) -> AsyncIterableOperator', () => {
    describe('(...iterables: Array) -> AsyncIterable', () => {
      describe('size(iterables) < 2', () => {
        it('throw InvalidArgumentsLengthError', () => {
          const iter = [1, 2, 3]

          const err = getSyncError<InvalidArgumentsLengthError>(() => concatAsync(iter))

          expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
          expect(err!.message).toMatch('2')
        })
      })

      describe('size(iterables) >= 2', () => {
        describe('(...iterables: Array<Iterable<PromiseLike<T>>>) -> AsyncIterable<T>', () => {
          describe('call', () => {
            it('return concated AsyncIterable', async () => {
              const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
              const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

              const result = concatAsync(iter1, iter2)
              const isIter = isAsyncIterable(result)
              const arrResult = await toArrayAsync(result)

              expect(isIter).toBe(true)
              expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
            })
          })
        })

        describe('call', () => {
          it('return concated iterable', async () => {
            const iter1 = getIter([1, 2, 3])
            const iter2 = toIterable(['a', 'b', 'c'])
            const iter3 = toAsyncIterable(['d', 'e', 'f'])

            const result = concatAsync(iter1, iter2, iter3)
            const isIter = isAsyncIterable(result)
            const arrResult = await toArrayAsync(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c', 'd', 'e', 'f'])
          })
        })
      })
    })
  })
})
