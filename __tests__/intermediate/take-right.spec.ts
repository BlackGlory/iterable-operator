import { consume, toArray, MockIterable } from '@test/utils'
import { getError } from 'return-style'
import { takeRight } from '@intermediate/take-right'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('takeRight', () => {
  test('close the unexhausted iterator', () => {
    const iter = new MockIterable(go(function* () {
     throw new Error()
    }))

    try {
      consume(takeRight(iter, 1))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('lazy evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 5

    const result = takeRight(iter, count)
    const isLazy = iter.nextIndex === 0
    consume(result)

    expect(isLazy).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('returns the iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 5

      const result = takeRight(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('returns the iterable that taken last count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = takeRight(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([2, 3])
    })
  })

  describe('count = 0', () => {
    it('returns the empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = takeRight(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter: number[] = []
      const count = -1

      const err = getError(() => takeRight(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
