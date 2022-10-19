import { match } from '@terminal/match'

describe('match<T>(iterable: Iterable<T>, sequence: ArrayLike<T>): boolean', () => {
  describe('sequence isnt empty', () => {
    describe('sequence is matched', () => {
      it('return true', () => {
        const iter = [1, 2, 3]
        const seq = [2, 3]

        const result = match(iter, seq)

        expect(result).toBe(true)
      })
    })

    describe('sequence isnt matched', () => {
      it('return false', () => {
        const iter = [1, 2, 3]
        const seq = [3, 2]

        const result = match(iter, seq)

        expect(result).toBe(false)
      })
    })
  })

  describe('sequence is empty', () => {
    it('return true', () => {
      const iter = [1, 2, 3]
      const seq: number[] = []

      const result = match(iter, seq)

      expect(result).toBe(true)
    })
  })
})
