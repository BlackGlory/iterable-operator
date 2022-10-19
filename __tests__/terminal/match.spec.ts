import { match } from '@terminal/match'

describe('match', () => {
  describe('sequence isnt empty', () => {
    describe('sequence is matched', () => {
      it('returns true', () => {
        const iter = [1, 2, 3]
        const seq = [2, 3]

        const result = match(iter, seq)

        expect(result).toBe(true)
      })
    })

    describe('sequence isnt matched', () => {
      it('returns false', () => {
        const iter = [1, 2, 3]
        const seq = [3, 2]

        const result = match(iter, seq)

        expect(result).toBe(false)
      })
    })
  })

  describe('sequence is empty', () => {
    it('returns true', () => {
      const iter = [1, 2, 3]
      const seq: number[] = []

      const result = match(iter, seq)

      expect(result).toBe(true)
    })
  })
})
