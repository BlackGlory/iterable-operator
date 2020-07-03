import { toAsyncIterable } from '@test/utils'
import { matchAsync } from '@output/match-async'
import '@test/matchers'

describe('matchAsync<T>(iterable: AsyncItreable<T>, sequence: ArrayLike<T>): Promise<boolean>', () => {
  describe('sequence isnt empty', () => {
    describe('sequence is matched', () => {
      it('return true', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq = [2, 3]

        const result = matchAsync(iter, seq)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('sequence isnt matched', () => {
      it('return false', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq = [3, 2]

        const result = matchAsync(iter, seq)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(false)
      })
    })
  })

  describe('sequence is empty', () => {
    it('return true', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const seq: number[] = []

      const result = matchAsync(iter, seq)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })
})
