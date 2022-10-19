import { consume, toArray, MockIterable, take } from '@test/utils'
import { split } from '@intermediate/split'
import '@blackglory/jest-matchers'

describe('split', () => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 1

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('returns the splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 3

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('returns the splited iterable', () => {
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
    it('returns the splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const sep = 0

      const result = split(iter, sep)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const sep = 1

    const result = split(iter, sep)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })
})
