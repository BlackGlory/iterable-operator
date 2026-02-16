import { describe, test, expect, it, vi } from 'vitest'
import { consume, toArray, MockIterable, take } from '@test/utils.js'
import { getError } from 'return-style'
import { repeat } from '@src/repeat.js'
import { pass } from '@blackglory/pass'

describe('repeat', () => {
  test('lazy and partial evaluation', () => {
    const iter = new MockIterable([1, 2, 3])
    const times = 2

    const result = repeat(iter, times)
    const isLazy = iter.nextIndex === 0
    consume(take(result, 1))
    const isPartial = iter.nextIndex === 1

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('times > 0', () => {
    it('returns the repeated iterable', () => {
      const iter = [1, 2, 3]
      const times = 2

      const result = repeat(iter, times)
      const arrResult = toArray(result)

      expect(arrResult).toStrictEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('returns the empty iterable', () => {
      const iter = [1, 2, 3]
      const times = 0

      const result = repeat(iter, times)
      const arrResult = toArray(result)

      expect(arrResult).toStrictEqual([])
    })
  })

  describe('times < 0', () => {
    it('throws InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const times = -1

      const err = getError(() => repeat(iter, times))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('times')
    })
  })

  test('times = Infinity', () => {
    const iter: number[] = []

    const result = repeat(iter, Infinity)
    const arrResult = toArray(result)

    expect(arrResult).toStrictEqual([])
  })
})
