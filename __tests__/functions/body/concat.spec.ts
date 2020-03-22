import { getSyncError } from '@test/return-style'
import { InvalidArgumentsLengthError } from '@error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { concat as call } from '@body/concat'
import { concat as pipe } from '@style/pipeline/body/concat'
import { concat as bind } from '@style/binding/body/concat'
import { ConcatOperator } from '@style/chaining/body/concat'

describe('concat', () => {
  describe.each([
    testCall('(...iterables: Iterable[]) -> Iterable', call)
  , testPipe('(...iterables: Iterable[]) -> (iterable: Iterable) -> Iterable', pipe)
  , testBind('(this: Iterable, ...iterables: Iterable[]) -> Iterable', bind)
  , testIterableChain('Operator::(...iterables: Iterable[]) -> Iterable', ConcatOperator.prototype.concat)
  ])('%s', (_, concat) => {
    describe('size(iterables) < 2', () => {
      it('throw InvalidArgumentsLengthError', () => {
        const iter = [1, 2, 3]

        const err = getSyncError<InvalidArgumentsLengthError>(() => concat(iter))

        expect(err).toBeInstanceOf(InvalidArgumentsLengthError)
        expect(err!.message).toMatch('2')
      })
    })

    describe('size(iterables) >= 2', () => {
      it('return concated iterable', () => {
        const iter1 = [1, 2, 3]
        const iter2 = ['a', 'b', 'c']

        const result = concat(iter1, iter2)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3, 'a', 'b', 'c'])
      })
    })
  })
})
