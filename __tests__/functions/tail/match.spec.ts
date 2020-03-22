import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { match as call } from '@tail/match'
import { match as pipe } from '@style/pipeline/tail/match'
import { match as bind } from '@style/binding/tail/match'
import { MatchOperator } from '@style/chaining/tail/match'

describe('match', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, sequence: ArrayLike<T>) -> boolean', call)
  , testPipe('(sequence: ArrayLike<T>) -> (iterable: Iterable<T>) -> boolean', pipe)
  , testBind('(this: Iterable<T>, sequence: ArrayLike<T>) -> boolean', bind)
  , testMethod('Operator<T>::(sequence: ArrayLike<T>) -> boolean', MatchOperator.prototype.match)
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
})
