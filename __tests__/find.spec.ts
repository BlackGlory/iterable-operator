import { getError } from 'return-style'
import { find } from '@src/find.js'
import { jest } from '@jest/globals'

describe('find', () => {
  it('called fn with [element, index]', () => {
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

  describe('fn returns true on first time', () => {
    it('called fn only once', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn().mockReturnValueOnce(true)

      find(iter, fn)

      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('fn returns true', () => {
    it('returns first element in the iterable that fn returns true', () => {
      const iter = [1, 2, 3]
      const isTwo = (x: number) => x === 2

      const result = find(iter, isTwo)

      expect(result).toBe(2)
    })
  })

  describe('fn returns false every time', () => {
    it('returns undefined', () => {
      const iter = [1, 2, 3]
      const isFour = (x: number) => x === 4

      const result = find(iter, isFour)

      expect(result).toBeUndefined()
    })
  })

  describe('fn throws an error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => find(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
