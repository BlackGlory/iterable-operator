import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { drop as call } from '@middleware/drop'
import { drop as pipe } from '@style/pipeline/middleware/drop'
import { drop as bind } from '@style/binding/middleware/drop'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('drop<T>(iterable: Iterable<T>, count: number): Iterable<T>', call)
, testPipe('drop<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('drop<T>(this: Iterable<T>, count: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::drop(count: number): IterableOperator<T>', IterableOperator.prototype.drop)
])('%s', (_, drop) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const count = 2

    const result = drop(iter, count)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('count > 0', () => {
    describe('count > size(iterable)', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const count = 5

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count = size(iterable)', () => {
      it('return emtpy iterable', () => {
        const iter = [1, 2, 3]
        const count = 3

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([])
      })
    })

    describe('count < size(iterable)', () => {
      it('return iterable that dropped the first count elements', () => {
        const iter = [1, 2, 3]
        const count = 2

        const result = drop(iter, count)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([3])
      })
    })
  })

  describe('count = 0', () => {
    it('return iterable copy', () => {
      const iter = [1, 2, 3]
      const count = 0

      const result = drop(iter, count)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(result).not.toBe(iter)
      expect(arrResult).toEqual([1, 2, 3])
    })
  })

  describe('count < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const count = -1

      const err = getError<InvalidArgumentError>(() => drop(iter, count))

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('count')
    })
  })
})
