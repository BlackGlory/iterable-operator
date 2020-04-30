import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { toArray } from '@test/utils'
import { toSet as call } from '@output/to-set'
import { toSet as pipe } from '@style/pipeline/output/to-set'
import { toSet as bind } from '@style/binding/output/to-set'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('toSet<T>(iterable: Iterable<T>): Set<T>', call)
, testPipe('toSet<T>(): (iterable: Iterable<T>) => Set<T>', pipe)
, testBind('toSet<T>(this: Iterable<T>): Set<T>', bind)
, testMethod('IterableOperator<T>::toSet(): Set<T>', IterableOperator.prototype.toSet)
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
