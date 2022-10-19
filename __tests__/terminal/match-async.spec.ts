import { toAsyncIterable } from '@test/utils'
import { matchAsync } from '@terminal/match-async'
import '@blackglory/jest-matchers'

describe('matchAsync', () => {
  describe('sequence isnt empty', () => {
    describe('sequence is matched', () => {
      it('returns true', async () => {
        const iter = toAsyncIterable([1, 2, 3])
        const seq = [2, 3]

        const result = matchAsync(iter, seq)
        const proResult = await result

        expect(result).toBePromise()
        expect(proResult).toBe(true)
      })
    })

    describe('sequence isnt matched', () => {
      it('returns false', async () => {
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
    it('returns true', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const seq: number[] = []

      const result = matchAsync(iter, seq)
      const proResult = await result

      expect(result).toBePromise()
      expect(proResult).toBe(true)
    })
  })
})
