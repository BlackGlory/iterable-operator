import { isIterable, toArray } from '@test/utils'
import { countdown } from '@input/countdown'

describe('countdown(begin: number, end: number): Iterable<number>', () => {
  describe('begin > end', () => {
    it('return iterable[begin:end]', () => {
      const iter = countdown(2, -2)

      const isIter = isIterable(iter)
      const arrResult = toArray(iter)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([2, 1, 0, -1, -2])
    })
  })

  describe('begin = end', () => {
    it('return iterable[begin]', () => {
      const iter = countdown(1, 1)

      const isIter = isIterable(iter)
      const arrResult = toArray(iter)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([1])
    })
  })

  describe('begin < end', () => {
    it('return empty iterable', () => {
      const iter = countdown(0, 1)

      const isIter = isIterable(iter)
      const arrResult = toArray(iter)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([])
    })
  })
})
