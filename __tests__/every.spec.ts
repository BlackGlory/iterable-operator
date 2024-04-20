import { describe, it, expect, vi } from 'vitest'
import { getError } from 'return-style'
import { every } from '@src/every.js'

describe('every', () => {
  describe('fn returns false on first element', () => {
    it('called fn only once', () => {
      const iter = [1, 2, 3]
      const fn = vi.fn().mockReturnValueOnce(false)

      every(iter, fn)

      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('fn returns true', () => {
    it('called fn with [element, index]', () => {
      const iter = [1, 2, 3]
      const fn = vi.fn().mockReturnValue(true)

      every(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe('fn returns true every time', () => {
    it('returns true', () => {
      const iter = [1, 2, 3]
      const fn = () => true

      const result = every(iter, fn)

      expect(result).toBe(true)
    })
  })

  describe('fn returns true not every time', () => {
    it('returns false', () => {
      const iter = [1, 2, 3]
      const isntNumber = () => false

      const result = every(iter, isntNumber)

      expect(result).toBe(false)
    })
  })

  describe('fn throws an error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => every(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
