import { getError } from 'return-style'
import { RuntimeError } from '@src/error'
import { testCall, testPipe, testBind, testMethod } from '@test/test-fixtures'
import { first as call } from '@output/first'
import { first as pipe } from '@style/pipeline/output/first'
import { first as bind } from '@style/binding/output/first'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe.each([
  testCall('first<T>(iterable: Iterable<T>): T', call)
, testPipe('first<T>(): (iterable: Iterable<T>) => T', pipe)
, testBind('first<T>(this: Iterable<T>): T', bind)
, testMethod('IterableOperator<T>::first(): T', IterableOperator.prototype.first)
])('%s', (_, first) => {
  describe('iterable is empty', () => {
    it('throw RuntimeError', () => {
      const iter: number[] = []

      const err = getError<RuntimeError>(() => first(iter))

      expect(err).toBeInstanceOf(RuntimeError)
    })
  })

  describe('iterable isnt empty', () => {
    it('return the first element in the iterable', () => {
      const iter = [1, 2, 3]

      const result = first(iter)

      expect(result).toBe(1)
    })
  })
})
