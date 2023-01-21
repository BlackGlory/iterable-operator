import { consume, toArray, MockIterable, take } from '@test/utils.js'
import { flatten } from '@src/flatten.js'

describe('flatten', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])

    const result = flatten(iter)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterable is empty', () => {
    it('returns the empty iterable', () => {
      const iter: number[] = []

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([])
    })
  })

  describe('iterable is string', () => {
    it('returns the iterable chars', () => {
      const iter = '123'

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(arrResult).toEqual(['1', '2', '3'])
    })
  })

  describe('iterable isnt string', () => {
    it('returns the flat iterable', () => {
      const iter = [
        'one', ['two']
      , 0, [1, [2]]
      ]

      const result = flatten(iter)
      const arrResult = toArray(result)

      expect(arrResult).toEqual([
        'o','n','e', 'two'
      , 0, 1, [2]
      ])
    })
  })
})
