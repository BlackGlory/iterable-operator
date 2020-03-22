import { RuntimeError } from '@error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { getSyncError } from '@test/return-style'
import { tail as call } from '@tail/tail'
import { tail as pipe } from '@style/pipeline/tail/tail'
import { tail as bind } from '@style/binding/tail/tail'
import { TailOperator } from '@style/chaining/tail/tail'

describe('tail', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> T', call)
  , testPipe('() -> (iterable: Iterable<T>) -> T', pipe)
  , testBind('(this: Iterable<T>) -> T', bind)
  , testMethod('Operator<T>::() -> T', TailOperator.prototype.tail)
  ])('%s', (_, tail) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', () => {
        const iter: number[] = []

        const err = getSyncError<RuntimeError>(() => tail(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the last element in the iterable', () => {
        const iter = [1, 2, 3]

        const result = tail(iter)

        expect(result).toBe(3)
      })
    })
  })
})
