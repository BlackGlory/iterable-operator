import { InvalidArgumentError } from '@src/error'
import { consume, toArray, MockIterable, take as testTake } from '@test/utils'
import { getError } from 'return-style'
import { take } from '@middleware/take'
import '@blackglory/jest-matchers'

describe('take<T>(iterable: Iterable<T>, count: number): Iterable<T>', () => {
  it('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 2

    const result = take(iter, count)
    const isLazy = iter.nextIndex === 0
    consume(testTake(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('return iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 5

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('return iterable that take first count elements', () => {
      const iter = [1, 2, 3]
      const count = 2

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2])
    })
  })

  describe('count = 0', () => {
    it('return empty iterable', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = take(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter: number[] = []
      const count = -1

      const err = getError<InvalidArgumentError>(() => take(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
