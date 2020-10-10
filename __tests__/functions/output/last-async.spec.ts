import { RuntimeError } from '@src/error'
import { getErrorPromise } from 'return-style'
import { toAsyncIterable } from '@test/utils'
import { lastAsync } from '@output/last-async'
import '@blackglory/jest-matchers'

describe('lastAsync<T>(iterable: AsyncIterable<T>): Promise<T>', () => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', async () => {
      const iter = toAsyncIterable([])

      const err = await getErrorPromise<RuntimeError>(lastAsync(iter))

      expect(err).toBeInstanceOf(RuntimeError)
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
