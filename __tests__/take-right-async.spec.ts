import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable } from '@test/utils'
import { getError } from 'return-style'
import { takeRightAsync } from '@src/take-right-async'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('takeRightAsync', () => {
  test('close the unexhausted iterator', async () => {
    const iter = new MockAsyncIterable(go(function* () {
     throw new Error()
    }))

    try {
      await consumeAsync(takeRightAsync(iter, 1))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('lazy evaluation', async () => {
    const iter = new MockAsyncIterable()
    const count = 5

    const result = takeRightAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(result)

    expect(isLazy).toBe(true)
  })

  describe('count > size(iterable)', () => {
    it('returns the iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 5

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('0 < count < size(iterable)', () => {
    it('returns the iterable that taken the first count elements', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 2

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([2, 3])
    })
  })

  describe('count = 0', () => {
    it('returns the empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = takeRightAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([])
      const count = -1

      const err = getError(() => takeRightAsync(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
