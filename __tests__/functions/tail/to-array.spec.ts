import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { toArray as call } from '@tail/to-array'
import { toArray as pipe } from '@style/pipeline/tail/to-array'
import { toArray as bind } from '@style/binding/tail/to-array'
import { ToArrayOperator } from '@style/chaining/tail/to-array'

describe('toArray', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> T[]', call)
  , testPipe('() -> (iterable: Iterable<T>) -> T[]', pipe)
  , testBind('(this: Iterable<T>) -> T[]', bind)
  , testMethod('Operator<T>::() -> T[]', ToArrayOperator.prototype.toArray)
  ])('%s', (_, toArray) => {
    describe('call', () => {
      it('return array from iterable', () => {
        const iter = [1, 2, 3]

        const result = toArray(iter)

        expect(result).toEqual([1, 2, 3])
      })
    })
  })
})
