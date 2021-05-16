import { getError } from 'return-style'
import { find } from '@output/find'

describe(`
  find<T>(
    iterable: Iterable<T>
  , predicate: (element: T, index: number) => unknown
  ): T | undefined
`, () => {
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
    it('return undefined', () => {
      const iter = [1, 2, 3]
      const isFour = (x: number) => x === 4

      const result = find(iter, isFour)

      expect(result).toBeUndefined()
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
