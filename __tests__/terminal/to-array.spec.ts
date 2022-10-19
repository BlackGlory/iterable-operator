import { toArray } from '@terminal/to-array'

describe('toArray<T>(iterable: Iterable<T>): T[]', () => {
  describe('call', () => {
    it('return array from iterable', () => {
      const iter = [1, 2, 3]

      const result = toArray(iter)

      expect(result).toEqual([1, 2, 3])
    })
  })
})
