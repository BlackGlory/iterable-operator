import { getError } from 'return-style'
import { RuntimeError } from '@src/error'
import { first } from '@output/first'

describe('first<T>(iterable: Iterable<T>): T', () => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', () => {
      const iter: number[] = []

      const err = getError<RuntimeError>(() => first(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the first element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = first(iter)

      expect(result).toBe(1)
    })
  })
})
