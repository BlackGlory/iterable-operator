import { last } from '@output/last'

describe('last<T>(iterable: Iterable<T>): T | undefined', () => {
  describe('iterable is empty', () => {
    it('return undefined', () => {
      const iter: number[] = []

      const result = last(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = last(iter)

      expect(result).toBe(3)
    })
  })
})
