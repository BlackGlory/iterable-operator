import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { includes as call } from '@tail/includes'
import { includes as pipe } from '@style/pipeline/tail/includes'
import { includes as bind } from '@style/binding/tail/includes'
import { IncludesOperator } from '@style/chaining/tail/includes'

describe('includes', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, value: T) -> boolean', call)
  , testPipe('(value: T) -> (iterable: Iterable<T>) -> boolean', pipe)
  , testBind('(this: Iterable<T>, value: T) -> boolean', bind)
  , testMethod('Operator<T>::(value: T) -> boolean', IncludesOperator.prototype.includes)
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
})
