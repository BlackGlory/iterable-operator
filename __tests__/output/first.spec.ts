import { first } from '@output/first'

describe('first<T>(iterable: Iterable<T>): T | undefined', () => {
  describe('iterable is empty', () => {
    it('return undefined', () => {
      const iter: number[] = []

      const result = first(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the first element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = first(iter)

      expect(result).toBe(1)
    })
  })
})
