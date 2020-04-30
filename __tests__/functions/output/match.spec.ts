import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { match as call } from '@output/match'
import { match as pipe } from '@style/pipeline/output/match'
import { match as bind } from '@style/binding/output/match'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('match<T>(iterable: Iterable<T>, sequence: ArrayLike<T>): boolean', call)
, testPipe('match<T>(sequence: ArrayLike<T>): (iterable: Iterable<T>) => boolean', pipe)
, testBind('match<T>(this: Iterable<T>, sequence: ArrayLike<T>): boolean', bind)
, testMethod('IterableOperator<T>::match(sequence: ArrayLike<T>): boolean', IterableOperator.prototype.match)
])('%s', (_, match) => {
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
