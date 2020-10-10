import { InvalidArgumentError } from '@src/error'
import { consume, toArray, MockIterable } from '@test/utils'
import { getError } from 'return-style'
import { takeRight } from '@middleware/take-right'
import '@blackglory/jest-matchers'

describe('takeRight<T>(iterable: Iterable<T>, count: number): Iterable<T>', () => {
  it('lazy evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 5

    const result = takeRight(iter, count)
    const isLazy = iter.nextIndex === 0
    consume(result)

    expect(isLazy).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('return iterable copy', () => {
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
    it('return iterable that taken last count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = takeRight(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([2, 3])
    })
  })

  describe('count = 0', () => {
    it('throw empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = takeRight(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter: number[] = []
      const count = -1

      const err = getError<InvalidArgumentError>(() => takeRight(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
