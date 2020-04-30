import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { toArray as call } from '@output/to-array'
import { toArray as pipe } from '@style/pipeline/output/to-array'
import { toArray as bind } from '@style/binding/output/to-array'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('toArray<T>(iterable: Iterable<T>): T[]', call)
, testPipe('toArray<T>(): (iterable: Iterable<T>) => T[]', pipe)
, testBind('toArray<T>(this: Iterable<T>) => T[]', bind)
, testMethod('IterableOperator<T>::toArray(): T[]', IterableOperator.prototype.toArray)
])('%s', (_, toArray) => {
  describe('call', () => {
    it('return array from iterable', () => {
      const iter = [1, 2, 3]

      const result = toArray(iter)

      expect(result).toEqual([1, 2, 3])
    })
  })
})
