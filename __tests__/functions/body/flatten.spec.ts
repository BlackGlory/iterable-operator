import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { flatten as call } from '@body/flatten'
import { flatten as pipe } from '@style/pipeline/body/flatten'
import { flatten as bind } from '@style/binding/body/flatten'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('flatten', () => {
  describe.each([
    testCall('(iterable: Iterable<T>) -> Iterable<U>', call)
  , testPipe('() -> (iterable: Iterable<T>) -> Iterable<U>', pipe)
  , testBind('(this: Iterable<T>) -> Iterable<U>', bind)
  , testIterableChain('Operator<T>::() -> Operator<U>', IterableOperator.prototype.flatten)
  ])('%s', (_, flatten) => {
    it('lazy evaluation', () => {
      const iter = new MarkIterable()

      const result = flatten(iter)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })

    describe('iterable is empty', () => {
      it('return empty iterable', () => {
        const iter: number[] = []

        const result = flatten(iter)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('iterable is string', () => {
      it('return iterable<char>', () => {
        const iter = '123'

        const result = flatten(iter)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual(['1', '2', '3'])
      })
    })

    describe('iterable isnt string', () => {
      it('return flat iterable', () => {
        const iter = [
          'one', ['two']
        , 0, [1, [2]]
        ]

        const result = flatten(iter)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([
          'o','n','e', 'two'
        , 0, 1, [2]
        ])
      })
    })
  })
})
