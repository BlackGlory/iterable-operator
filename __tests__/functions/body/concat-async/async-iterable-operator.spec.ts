import { getSyncError } from '@test/return-style'
import { isAsyncIterable, toArrayAsync, toIterable, toAsyncIterable } from '@test/utils'
import { InvalidArgumentsLengthError } from '@src/error'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import { asyncIterableChain } from '@test/style-helpers'

const concatAsync = asyncIterableChain(AsyncIterableOperator.prototype.concatAsync)
const getIter = toAsyncIterable

describe('AsyncIterableOperator::concatAsync', () => {
  describe('(...iterables: Array<Iterable | AsyncIterable>) -> AsyncIterableOperator', () => {
    describe('(...iterables: Array) -> AsyncIterable', () => {
      describe('size(iterables) < 2', () => {
        it('throw InvalidArgumentsLengthError', () => {
          const iter = getIter([1, 2, 3])

          const err = getSyncError<InvalidArgumentsLengthError>(() => concatAsync(iter))

          expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
          expect(err!.message).toMatch('2')
        })
      })

      describe('size(iterables) >= 2', () => {
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
