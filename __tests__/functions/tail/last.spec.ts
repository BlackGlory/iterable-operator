import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { getSyncError } from '@test/return-style'
import { last as call } from '@tail/last'
import { last as pipe } from '@style/pipeline/tail/last'
import { last as bind } from '@style/binding/tail/last'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('last', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> T', call)
  , testPipe('() -> (iterable: Iterable<T>) -> T', pipe)
  , testBind('(this: Iterable<T>) -> T', bind)
  , testMethod('Operator<T>::() -> T', IterableOperator.prototype.last)
  ])('%s', (_, last) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', () => {
        const iter: number[] = []

        const err = getSyncError<RuntimeError>(() => last(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the last element in the iterable', () => {
        const iter = [1, 2, 3]

        const result = last(iter)

        expect(result).toBe(3)
      })
    })
  })
})
