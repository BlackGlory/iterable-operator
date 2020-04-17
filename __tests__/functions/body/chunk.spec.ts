import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { chunk as call } from '@body/chunk'
import { chunk as pipe } from '@style/pipeline/body/chunk'
import { chunk as bind } from '@style/binding/body/chunk'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('chunk', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, size: number) -> Iterable<T[]>', call)
  , testPipe('(size: number) -> (iterable: Iterable<T>) -> Iterable<T[]>', pipe)
  , testBind('(this: Iterable<T>, size: number) -> Iterable<T[]>', bind)
  , testIterableChain('Operator<T>::(size: number) -> Operator<T[]>', IterableOperator.prototype.chunk)
  ])('%s', (_, chunk) => {
    describe('size > 0', () => {
      it('return chunked iterable', () => {
        const iter = [1, 2, 3]
        const size = 2

        const result = chunk(iter, size)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [3]])
      })
    })

    describe('size = 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = [1, 2, 3]
        const size = 0

        const err = getSyncError<InvalidArgumentError>(() => chunk(iter, size))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('size')
      })
    })

    describe('size < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = [1, 2, 3]
        const size = -1

        const err = getSyncError<InvalidArgumentError>(() => chunk(iter, size))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('size')
      })
    })
  })
})
