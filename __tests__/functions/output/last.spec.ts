import { RuntimeError } from '@src/error'
import { getError } from 'return-style'
import { last } from '@output/last'

describe('last<T>(iterable: Iterable<T>): T', () => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', () => {
      const iter: number[] = []

      const err = getError<RuntimeError>(() => last(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = last(iter)

      expect(result).toBe(3)
    })
  })
})
