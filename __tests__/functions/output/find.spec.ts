import { getError } from 'return-style'
import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { find as call } from '@output/find'
import { find as pipe } from '@style/pipeline/output/find'
import { find as bind } from '@style/binding/output/find'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('find<T>(iterable: Iterable<T>, fn: (element: T, index: number) => boolean): T', call)
, testPipe('find<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => T', pipe)
, testBind('find<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): T', bind)
, testMethod('IterableOperator<T>::find(fn: (element: T, index: number) => boolean): T', IterableOperator.prototype.find)
])('%s', (_, find) => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true)

      find(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('fn return true on first time', () => {
      it('fn is called once', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn().mockReturnValueOnce(true)

        find(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })
  })

  describe('fn return true', () => {
    it('return first element in the iterable that fn return true', () => {
      const iter = [1, 2, 3]
      const isTwo = (x: number) => x === 2

      const result = find(iter, isTwo)

      expect(result).toBe(2)
    })
  })

  describe('fn return false every time', () => {
    it('throw RuntimeError', () => {
      const iter = [1, 2, 3]
      const isFour = (x: number) => x === 4

      const err = getError<RuntimeError>(() => find(iter, isFour))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => find(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
