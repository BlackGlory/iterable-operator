import { getError } from 'return-style'
import { groupBy } from '@output/group-by'
import { toArray } from '@test/utils'

describe(`
  groupBy<T, U>(
    iterable: Iterable<T>
  , fn: (element: T, index: number) => U
  ): Map<U, T[]>
`, () => {
  describe('fn is called', () => {
    it('called with [element,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()

      groupBy(iter, fn)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 1, 0)
      expect(fn).nthCalledWith(2, 2, 1)
      expect(fn).nthCalledWith(3, 3, 2)
    })
  })

  describe('call', () => {
    it('execute fn once for each iterable element', () => {
      const iter = [1, 2, 3]
      const fn = (x: number) => x % 2

      const result = groupBy(iter, fn)

      expect(result).toBeInstanceOf(Map)
      expect(toArray(result)).toEqual([
        [1, [1, 3]]
      , [0, [2]]
      ])
    })
  })

  describe('fn throw error', () => {
    it('throw error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => groupBy(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
