import { getError } from 'return-style'
import { toArrayAsync, toIterable, toAsyncIterable, MarkIterable } from '@test/utils'
import { InvalidArgumentsLengthError } from '@src/error'
import { IterableOperator } from '@style/chaining/iterable-operator'
import { iterableChainAsync } from '@test/style-helpers'
import '@test/matchers'

const concatAsync = iterableChainAsync(IterableOperator.prototype.concatAsync)
const getIter = toIterable

describe('IterableOperator<T>::concatAsync(...iterables: Array<Itereable<unknown> | AsyncIterable<unknown>>): AsyncIterableOperator<T>', () => {
  describe('size(iterables) < 2', () => {
    it('throw InvalidArgumentsLengthError', () => {
      const iter = [1, 2, 3]

      const err = getError<InvalidArgumentsLengthError>(() => concatAsync(iter))

      expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
      expect(err!.message).toMatch('2')
    })
  })

  describe('size(iterables) >= 2', () => {
    describe('IterableOperator<PromiseLike<T>>::concat(...iterables: Array<Iterable<PromiseLike<T>>>): AsyncIterableOperator<T>', () => {
      describe('call', () => {
        it('lazy evaluation', async () => {
          const mark = new MarkIterable()
          const iter1 = getIter(mark)
          const iter2 = getIter([])

          const result = concatAsync(iter1, iter2)
          const isEval1 = mark.isEvaluated()
          await toArrayAsync(result)
          const isEval2 = mark.isEvaluated()

          expect(isEval1).toBe(false)
          expect(isEval2).toBe(true)
        })

        it('return concated AsyncIterable', async () => {
          const iter1 = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]
          const iter2 = [Promise.resolve('a'), Promise.resolve('b'), Promise.resolve('c')]

          const result = concatAsync(iter1, iter2)
          const arrResult = await toArrayAsync(result)

          expect(result).toBeAsyncIterable()
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
        const arrResult = await toArrayAsync(result)

        expect(result).toBeAsyncIterable()
        expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c', 'd', 'e', 'f'])
      })
    })
  })
})
