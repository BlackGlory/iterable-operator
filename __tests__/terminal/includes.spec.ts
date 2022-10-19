import { includes } from '@terminal/includes'

describe('includes<T>(iterable: Iterable<T>, value: T): boolean', () => {
  describe('value is included in the iterable', () => {
    it('return true', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 2)

      expect(result).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('return false', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 4)

      expect(result).toBe(false)
    })
  })
})
