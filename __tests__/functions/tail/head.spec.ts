import { getSyncError } from '@test/return-style'
import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { head as call } from '@tail/head'
import { head as pipe } from '@style/pipeline/tail/head'
import { head as bind } from '@style/binding/tail/head'
import { HeadOperator } from '@style/chaining/tail/head'

describe('head', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> T', call)
  , testPipe('() -> (iterable: Iterable<T>) -> T', pipe)
  , testBind('(this: Iterable<T>) -> T', bind)
  , testMethod('Operator<T>::() -> T', HeadOperator.prototype.head)
  ])('%s', (_, head) => {
    describe('iterable is empty', () => {
      it('throw RuntimeError', () => {
        const iter: number[] = []

        const err = getSyncError<RuntimeError>(() => head(iter))

        expect(err).toBeInstanceOf(RuntimeError)
      })
    })

    describe('iterable isnt empty', () => {
      it('return the first element in the iterable', () => {
        const iter = [1, 2, 3]

        const result = head(iter)

        expect(result).toBe(1)
      })
    })
  })
})
