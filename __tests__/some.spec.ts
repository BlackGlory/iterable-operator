import { describe, it, expect, vi } from 'vitest'
import { getError } from 'return-style'
import { some } from '@src/some.js'

describe('some', () => {
  it('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = vi.fn().mockReturnValue(false)

    some(iter, fn)

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, 1, 0)
    expect(fn).nthCalledWith(2, 2, 1)
    expect(fn).nthCalledWith(3, 3, 2)
  })

  describe('fn returns true on first element', () => {
    it('called fn only once', () => {
      const iter = [1, 2, 3]
      const fn = vi.fn().mockReturnValueOnce(true)

      some(iter, fn)

      expect(fn).toBeCalledTimes(1)
    })
  })

  describe('fn returns true', () => {
    it('returns true', () => {
      const iter = [1, 2, 3]
      const fn = () => true

      const result = some(iter, fn)

      expect(result).toBe(true)
    })
  })

  describe('fn returns false every time', () => {
    it('returns false', () => {
      const iter = [1, 2, 3]
      const fn =  () => false

      const result = some(iter, fn)

      expect(result).toBe(false)
    })
  })

  describe('fn throws an error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => some(iter, fn))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toBe('CustomError')
    })
  })
})
