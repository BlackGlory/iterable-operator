import { toArray, MockIterable, take } from '@test/utils'
import { split } from '@middleware/split'
import '@test/matchers'

describe('split<T>(iterable: Iterable<T>, separator: T): Iterable<T[]>', () => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 1

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 3

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 5

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('separator not in iterable', () => {
    it('return splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const sep = 0

      const result = split(iter, sep)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const sep = 1

    const result = split(iter, sep)
    const isLazy = iter.nextIndex === 0
    toArray(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })
})
