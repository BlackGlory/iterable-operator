import { toAsyncIterable, MockAsyncIterable } from '@test/utils'
import { lastAsync } from '@terminal/last-async'
import '@blackglory/jest-matchers'
import { go } from '@blackglory/go'
import { pass } from '@blackglory/pass'

describe('lastAsync<T>(iterable: AsyncIterable<T>): Promise<T | undefined>', () => {
  test('close unexhausted iterator', async () => {
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
    it('return undefined', async () => {
      const iter = toAsyncIterable([])

      const result = lastAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBeUndefined()
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])

      const result = lastAsync(iter)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(3)
    })
  })
})
