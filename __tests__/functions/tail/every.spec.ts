import { getSyncError } from '@test/return-style'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { every as call } from '@tail/every'
import { every as pipe } from '@style/pipeline/tail/every'
import { every as bind } from '@style/binding/tail/every'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('every', () => {
  describe.each([
    testCall('(itearble: Iterable<T>, fn: (element: T, index: number) -> boolean) -> boolean', call)
  , testPipe('(fn: (element: T, index: number) -> boolean) -> (iterable: Iterable<T>) -> boolean', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> boolean) -> boolean', bind)
  , testMethod('Operator<T>::(fn: (element: T, index: number) -> boolean) -> boolean', IterableOperator.prototype.every)
  ])('%s', (_, every) => {
    describe('fn is called', () => {
      describe('fn return false on first element', () => {
        it('called once', () => {
          const iter = [1, 2, 3]
          const fn = jest.fn().mockReturnValueOnce(false)

          every(iter, fn)

          expect(fn).toBeCalledTimes(1)
        })
      })

      describe('fn return true', () => {
        it('called with [element,index]', () => {
          const iter = [1, 2, 3]
          const fn = jest.fn().mockReturnValue(true)

          every(iter, fn)

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, 1, 0)
          expect(fn).nthCalledWith(2, 2, 1)
          expect(fn).nthCalledWith(3, 3, 2)
        })
      })
    })

    describe('fn return true every time', () => {
      it('return true', () => {
        const iter = [1, 2, 3]
        const fn = () => true

        const result = every(iter, fn)

        expect(result).toBe(true)
      })
    })

    describe('fn return true not every time', () => {
      it('return false', () => {
        const iter = [1, 2, 3]
        const isntNumber = () => false

        const result = every(iter, isntNumber)

        expect(result).toBe(false)
      })
    })

    describe('fn throw error', () => {
      it('throw error', () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = () => { throw customError }

        const err = getSyncError(() => every(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
