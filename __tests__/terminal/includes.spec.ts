import { includes } from '@terminal/includes'

describe('includes', () => {
  describe('value is included in the iterable', () => {
    it('returns true', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 2)

      expect(result).toBe(true)
    })
  })

  describe('value isnt included in the iterable', () => {
    it('returns false', () => {
      const iter = [1, 2, 3]

      const result = includes(iter, 4)

      expect(result).toBe(false)
    })
  })
})
