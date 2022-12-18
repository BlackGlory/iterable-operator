import { toAsyncIterable, MockAsyncIterable } from '@test/utils'
import { lastAsync } from '@src/last-async'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('lastAsync', () => {
  test('close the unexhausted iterator', async () => {
    const iter = new MockAsyncIterable(go(function* () {
     throw new Error()
    }))

    try {
      await lastAsync(iter)
    } catch {
      pass()
    }

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  describe('iterable is empty', () => {
    it('returns undefined', async () => {
      const iter = toAsyncIterable([])

      const result = await lastAsync(iter)

      expect(result).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('returns the last element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = await lastAsync(iter)

      expect(result).toBe(3)
    })
  })
})
