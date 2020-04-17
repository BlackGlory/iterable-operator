import { getSyncError } from '@test/return-style'
import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { first as call } from '@tail/first'
import { first as pipe } from '@style/pipeline/tail/first'
import { first as bind } from '@style/binding/tail/first'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('first', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> T', call)
  , testPipe('() -> (iterable: Iterable<T>) -> T', pipe)
  , testBind('(this: Iterable<T>) -> T', bind)
  , testMethod('Operator<T>::() -> T', IterableOperator.prototype.first)
  ])('%s', (_, first) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', () => {
        const iter: number[] = []

        const err = getSyncError<RuntimeError>(() => first(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the first element in the iterable', () => {
        const iter = [1, 2, 3]

        const result = first(iter)

        expect(result).toBe(1)
      })
    })
  })
})
