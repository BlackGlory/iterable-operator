import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { uniq as call } from '@body/uniq'
import { uniq as pipe } from '@style/pipeline/body/uniq'
import { uniq as bind } from '@style/binding/body/uniq'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('uniq', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> Iterable<T>', call)
  , testPipe('() -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::() -> Operator<T>', IterableOperator.prototype.uniq)
  ])('%s', (_, uniq) => {
    describe('call', () => {
      it('return unique iterable', () => {
        const iter = [1, 1, 2, 2, 3, 3]

        const result = uniq(iter)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })
  })
})
