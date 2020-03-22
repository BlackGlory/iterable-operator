import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { toArray } from '@test/utils'
import { toSet as call } from '@tail/to-set'
import { toSet as pipe } from '@style/pipeline/tail/to-set'
import { toSet as bind } from '@style/binding/tail/to-set'
import { ToSetOperator } from '@style/chaining/tail/to-set'

describe('toSet', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> Set<T>', call)
  , testPipe('() -> (iterable: Iterable<T>) -> Set<T>', pipe)
  , testBind('(this: Iterable<T>) -> Set<T>', bind)
  , testMethod('Operator<T>::() -> Set<T>', ToSetOperator.prototype.toSet)
  ])('%s', (_, toSet) => {
    describe('call', () => {
      it('return Set from iterable', () => {
        const iter = [1, 1, 2, 2, 3, 3]

        const result = toSet(iter)
        const arrResult = toArray(result)

        expect(result).toBeInstanceOf(Set)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })
  })
})
