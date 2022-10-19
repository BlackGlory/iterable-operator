import { getError } from 'return-style'
import { every } from '@output/every'

describe(`
  every<T>(itearble: Iterable<T>, predicate: (element: T, index: number) => unknown): boolean
`, () => {
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

      const err = getError(() => every(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
