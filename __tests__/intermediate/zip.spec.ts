import { consume, toArray, MockIterable } from '@test/utils'
import { zip } from '@intermediate/zip'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('zip' , () => {
  test('close the unexhausted iterator', () => {
    const iter = new MockIterable(go(function* () {
     throw new Error()
    }))

    try {
      consume(zip(iter, []))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('lazy evaluation', () => {
    const iter1 = new MockIterable([1, 2, 3])
    const iter2: unknown[] = []

    const result = zip(iter1, iter2)
    const isLazy = iter1.nextIndex === 0
    consume(result)
    const isPartial = iter1.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('iterables have same size', () => {
    it('returns the zipped iterable', () => {
      const iter1 = [1, 2, 3]
      const iter2 = ['a', 'b', 'c']

      const result = zip(iter1, iter2)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 'a'], [2, 'b'], [3, 'c']])
    })
  })

  describe('iterables have not same size', () => {
    it('returns the zipped iterable by the shortest iterable', () => {
      const iter1 = [1, 2, 3]
      const iter2 = ['a', 'b']

      const result = zip(iter1, iter2)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 'a'], [2, 'b']])
    })
  })
})
