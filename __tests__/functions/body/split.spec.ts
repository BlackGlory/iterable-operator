import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray } from '@test/utils'
import { split as call } from '@body/split'
import { split as pipe } from '@style/pipeline/body/split'
import { split as bind } from '@style/binding/body/split'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('split', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, separator: T) -> Iterable<T[]>', call)
  , testPipe('(separator: T) -> (iterable: Iterable<T>) -> Iterable<T[]>', pipe)
  , testBind('(this: Iterable<T>, separator: T) -> Iterable<T[]>', bind)
  , testIterableChain('Operator<T>::(separator: T) -> Operator<T[]>', IterableOperator.prototype.split)
  ])('%s', (_, split) => {
    describe('call', () => {
      it('return splited iterable', () => {
        const iter = [1, 2, 3, 4, 5]
        const sep = 3

        const result = split(iter, sep)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([[1, 2], [4, 5]])
      })
    })
  })
})
