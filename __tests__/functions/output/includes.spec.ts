import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { includes as call } from '@output/includes'
import { includes as pipe } from '@style/pipeline/output/includes'
import { includes as bind } from '@style/binding/output/includes'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('includes<T>(iterable: Iterable<T>, value: T): boolean', call)
, testPipe('includes<T>(value: T): (iterable: Iterable<T>) => boolean', pipe)
, testBind('includes<T>(this: Iterable<T>, value: T): boolean', bind)
, testMethod('IterableOperator<T>::includes(value: T): boolean', IterableOperator.prototype.includes)
])('%s', (_, includes) => {
  describe('value is included in the iterable', () => {
    it('return true', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 2)

      expect(result).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('return false', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 4)

      expect(result).toBe(false)
    })
  })
})
