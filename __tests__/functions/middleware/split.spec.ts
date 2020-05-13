import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { split as call } from '@middleware/split'
import { split as pipe } from '@style/pipeline/middleware/split'
import { split as bind } from '@style/binding/middleware/split'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('split<T>(iterable: Iterable<T>, separator: T): Iterable<T[]>', call)
, testPipe('split<T>(separator: T): (iterable: Iterable<T>) => Iterable<T[]>', pipe)
, testBind('split<T>(this: Iterable<T>, separator: T): Iterable<T[]>', bind)
, testIterableChain('IterableOperator<T>::split(separator: T): IterableOperator<T[]>', IterableOperator.prototype.split)
])('%s', (_, split) => {
  describe('separator in iterable', () => {
    describe('separator is first', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 1

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[], [2, 3, 4, 5]])
      })
    })

    describe('separator is middle', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 3

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })

    describe('separator is last', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 5

        const result = split(iter, sep)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual([[1, 2, 3, 4], []])
      })
    })
  })

  describe('separator not in iterable', () => {
    it('return splited iterable', () => {
      const iter = [1, 2, 3, 4, 5]
      const sep = 0

      const result = split(iter, sep)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([[1, 2, 3, 4, 5]])
    })
  })

  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const sep = 3

    const result = split(iter, sep)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })
})
