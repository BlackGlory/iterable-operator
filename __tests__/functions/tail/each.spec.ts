import { getSyncError } from '@test/return-style'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { each as call } from '@tail/each'
import { each as pipe } from '@style/pipeline/tail/each'
import { each as bind } from '@style/binding/tail/each'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('each', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, fn: (element: T, index: number) -> unknown) -> void', call)
  , testPipe('(fn: (element: T, index: number) -> unknown) -> (iterable: Iterable<T>) -> void', pipe)
  , testBind('(this: Iterable<T>, fn: (element: T, index: number) -> unknown) -> void', bind)
  , testMethod('Operator<T>::(fn: (element: T, index: number) -> unknown) -> void', IterableOperator.prototype.each)
  ])('%s', (_, each) => {
    describe('fn is called', () => {
      it('called with [element,index]', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn()

        each(iter, fn)

        expect(fn).toBeCalledTimes(3)
        expect(fn).nthCalledWith(1, 1, 0)
        expect(fn).nthCalledWith(2, 2, 1)
        expect(fn).nthCalledWith(3, 3, 2)
      })
    })

    describe('call', () => {
      it('execute fn once for each iterable element', () => {
        const iter = [1, 2, 3]
        const sideResult: Array<[number, number]> = []
        const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

        const result = each(iter, pushToSideResult)

        expect(result).toBeUndefined()
        expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
      })
    })

    describe('fn throw error', () => {
      it('throw error', () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = () => { throw customError }

        const err = getSyncError(() => each(iter, fn))

        expect(err).toBe(customError)
      })
    })
  })
})
