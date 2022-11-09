import { first } from '@src/first'

describe('first', () => {
  describe('iterable is empty', () => {
    it('returns undefined', () => {
      const iter: number[] = []

      const result = first(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('returns the first element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = first(iter)

      expect(result).toBe(1)
    })
  })
})
