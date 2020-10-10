import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { consume, toArray, MockIterable } from '@test/utils'
import { dropRight } from '@middleware/drop-right'
import '@blackglory/jest-matchers'

describe('dropRight<T>(iterable: Iterable<T>, count: number): Iterable<T>', () => {
  it('lazy evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 1

    const result = dropRight(iter, count)
    const isEval1 = iter.nextIndex === 0
    consume(result)

    expect(isEval1).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 3

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('return iterable that dropped the last count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = dropRight(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([1])
      })
    })
  })

  describe('count = 0', () => {
    it('return iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = dropRight(iter, count)
      const arrResult = toArray(result)

        expect(result).toBeIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const count = -1

      const err = getError<InvalidArgumentError>(() => dropRight(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
