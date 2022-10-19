import { toArray } from '@test/utils'
import { toSet } from '@terminal/to-set'

describe('toSet<T>(iterable: Iterable<T>): Set<T>', () => {
  describe('call', () => {
    it('return Set from iterable', () => {
      const iter = [1, 1, 2, 2, 3, 3]

      const result = toSet(iter)
      const arrResult = toArray(result)

      expect(result).toBeInstanceOf(Set)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })
})
