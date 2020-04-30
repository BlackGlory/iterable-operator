import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { getError } from 'return-style'
import { last as call } from '@output/last'
import { last as pipe } from '@style/pipeline/output/last'
import { last as bind } from '@style/binding/output/last'
import { IterableOperator } from '@style/chaining/iterable-operator'
describe.each([
  testCall('last<T>(iterable: Iterable<T>): T', call)
, testPipe('last<T>(): (iterable: Iterable<T>) => T', pipe)
, testBind('last<T>(this: Iterable<T>): T', bind)
, testMethod('IterableOperator<T>::last(): T', IterableOperator.prototype.last)
])('%s', (_, last) => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', () => {
      const iter: number[] = []

      const err = getError<RuntimeError>(() => last(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the last element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = last(iter)

      expect(result).toBe(3)
    })
  })
})
