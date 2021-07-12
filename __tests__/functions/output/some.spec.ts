import { getError } from 'return-style'
import { some } from '@output/some'

describe(`
  some<T>(iterable: Iterable<T>, predicate: (element: T, index: number) => unknown): boolean
`, () => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn().mockReturnValue(false)

      some(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })

    describe('fn return true on first element', () => {
      it('called once', () => {
        const iter = [1, 2, 3]
        const fn = jest.fn().mockReturnValueOnce(true)

        some(iter, fn)

        expect(fn).toBeCalledTimes(1)
      })
    })

  })

  describe('fn return true', () => {
    it('return true', () => {
      const iter = [1, 2, 3]
      const fn = () => true

      const result = some(iter, fn)

      expect(result).toBe(true)
    })
  })

  describe('fn return false every time', () => {
    it('return false', () => {
      const iter = [1, 2, 3]
      const fn =  () => false

      const result = some(iter, fn)

      expect(result).toBe(false)
    })
  })

  describe('fn throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => some(iter, fn))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toBe('CustomError')
    })
  })
})
