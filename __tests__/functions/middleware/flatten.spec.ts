import { consume, toArray, MockIterable, take } from '@test/utils'
import { flatten } from '@middleware/flatten'
import '@blackglory/jest-matchers'

describe('flatten<T, U>(iterable: Iterable<T>): IterableIterator<U>', () => {
  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])

    const result = flatten(iter)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('return empty iterable', () => {
      const iter: number[] = []

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable is string', () => {
    it('return iterable<char>', () => {
      const iter = '123'

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual(['1', '2', '3'])
    })
  })

  describe('iterable isnt string', () => {
    it('return flat iterable', () => {
      const iter = [
        'one', ['two']
      , 0, [1, [2]]
      ]

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([
        'o','n','e', 'two'
      , 0, 1, [2]
      ])
    })
  })
})
