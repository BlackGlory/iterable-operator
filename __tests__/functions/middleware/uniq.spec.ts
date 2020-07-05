import { consume, toArray, MockIterable, take } from '@test/utils'
import { uniq } from '@middleware/uniq'
import '@test/matchers'

describe('uniq<T>(iterable: Iterable<T>): Iterable<T>', () => {
  describe('call', () => {
    it('return unique iterable', () => {
      const iter = [1, 1, 2, 2, 3, 3]

      const result = uniq(iter)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3])
    })

    it('lazy and partial evalutation', () => {
      const iter = new MockIterable([1, 2, 3])

      const result = uniq(iter)
      const isLazy = iter.nextIndex === 0
      consume(take(result, 1))
      const isPartial = iter.nextIndex === 1

      expect(isLazy).toBe(true)
      expect(isPartial).toBe(true)
    })
  })
})
