import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { uniq as call } from '@middleware/uniq'
import { uniq as pipe } from '@style/pipeline/middleware/uniq'
import { uniq as bind } from '@style/binding/middleware/uniq'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('uniq<T>(iterable: Iterable<T>): Iterable<T>', call)
, testPipe('uniq<T>(): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('uniq<T>(this: Iterable<T>): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::uniq() => IterableOperator<T>', IterableOperator.prototype.uniq)
])('%s', (_, uniq) => {
  describe('call', () => {
    it('return unique iterable', () => {
      const iter = [1, 1, 2, 2, 3, 3]

      const result = uniq(iter)
      const isIter = isIterable(result)
      const arrResult = toArray(result)

      expect(isIter).toBe(true)
      expect(arrResult).toEqual([1, 2, 3])
    })

    it('lazy evalutation', () => {
      const iter = new MarkIterable()

      const result = uniq(iter)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })
  })
})
