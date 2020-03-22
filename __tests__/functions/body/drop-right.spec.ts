import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { dropRight as call } from '@body/drop-right'
import { dropRight as pipe } from '@style/pipeline/body/drop-right'
import { dropRight as bind} from '@style/binding/body/drop-right'
import { DropRightOperator } from '@style/chaining/body/drop-right'

describe('dropRight', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, count: number) -> Iterable<T>', call)
  , testPipe('(count: number) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, count: number) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(count: number) -> Operator<T>', DropRightOperator.prototype.dropRight)
  ])('%s', (_, dropRight) => {
    describe('count > 0', () => {
      describe('count > size(iterable)', () => {
        it('return empty iterable', () => {
          const iter = [1, 2, 3]
          const count = 5

          const result = dropRight(iter, count)
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([])
        })
      })

      describe('count < size(iterable)', () => {
        it('return iterable that dropped the last count elements', () => {
          const iter = [1, 2, 3]
          const count = 2

          const result = dropRight(iter, count)
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual([1])
        })
      })
    })

    describe('count = 0', () => {
      it('return iterable copy', () => {
        const iter = [1, 2, 3]
        const count = 0

        const result = dropRight(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(result).not.toBe(iter)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })

    describe('count < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = [1, 2, 3]
        const count = -1

        const err = getSyncError<InvalidArgumentError>(() => dropRight(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
