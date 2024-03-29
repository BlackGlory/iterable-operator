import { consumeAsync, toAsyncIterable, toArrayAsync, MockAsyncIterable, takeAsync }
  from '@test/utils.js'
import { getError } from 'return-style'
import { dropAsync } from '@src/drop-async.js'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('dropAsync', () => {
  test('close the unexhausted iterator', async () => {
    const iter = new MockAsyncIterable(go(function* () {
     throw new Error()
    }))

    try {
      await consumeAsync(dropAsync(iter, 1))
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  test('lazy and partial evaluation', async () => {
    const iter = new MockAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropAsync(iter, count)
    const isLazy = iter.nextIndex === 0
    await consumeAsync(takeAsync(result, 1))
    const isPartial = iter.nextIndex === 2

    expect(isLazy).toBe(true)
    expect(isPartial).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('returns an empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 5

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('returns an empty iterable', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 3

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('returns the iterable that dropped the first count elements', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const count = 2

        const result = dropAsync(iter, count)
        const arrResult = await toArrayAsync(result)

        expect(arrResult).toEqual([3])
      })
    })
  })

  describe('count = 0', () => {
    it('returns the iterable copy', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = 0

      const result = dropAsync(iter, count)
      const arrResult = await toArrayAsync(result)

      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throws an error', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const count = -1

      const err = getError(() => dropAsync(iter, count))

      expect(err).toBeInstanceOf(Error)
      expect(err!.message).toMatch('count')
    })
  })
})
