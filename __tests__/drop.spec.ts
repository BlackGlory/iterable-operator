import { getError } from 'return-style'
import { consume, toArray, MockIterable, take } from '@test/utils'
import { drop } from '@src/drop'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('drop', () => {
  test('close the unexhausted iterator', () => {
    const iter = new MockIterable(go(function* () {
     throw new Error()
    }))

    try {
      consume(drop(iter, 1))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const count = 1

    const result = drop(iter, count)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 2

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('returns an empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('returns an emtpy iterable', () => {
        const iter = [1, 2, 3]
        const count = 3

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('returns the iterable that dropped the first count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(arrResult).toEqual([3])
      })
    })
  })

  describe('count = 0', () => {
    it('returns the iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = drop(iter, count)
      const arrResult = toArray(result)

      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = [1, 2, 3]
      const count = -1

      const err = getError(() => drop(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
