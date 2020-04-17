import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { getSyncError } from '@test/return-style'
import { take as call } from '@body/take'
import { take as pipe } from '@style/pipeline/body/take'
import { take as bind } from '@style/binding/body/take'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('take', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, count: number) -> Iterable<T>', call)
  , testPipe('(count: number) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(iterable: Iterable<T>, count: number) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(count: number) -> Operator<T>', IterableOperator.prototype.take)
  ])('%s', (_, take) => {
    describe('count > size(iterable)', () => {
      it('return iterable copy', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = take(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3])
      })
    })

    describe('0 < count < size(iterable)', () => {
      it('return iterable that take first count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = take(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2])
      })
    })

    describe('count = 0', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 0

        const result = take(iter, count)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('count < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter: number[] = []
        const count = -1

        const err = getSyncError<InvalidArgumentError>(() => take(iter, count))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('count')
      })
    })
  })
})
