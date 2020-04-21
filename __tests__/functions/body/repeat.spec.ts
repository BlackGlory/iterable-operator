import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { getSyncError } from '@test/return-style'
import { repeat as call } from '@body/repeat'
import { repeat as pipe } from '@style/pipeline/body/repeat'
import { repeat as bind } from '@style/binding/body/repeat'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('repeat', () => {
  describe.each([
    testCall('(iterable: Iterable<T>, times: number) -> Iterable<T>', call)
  , testPipe('(times: number) -> (iterable: Iterable<T>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<T>, times: number) -> Iterable<T>', bind)
  , testIterableChain('Operator<T>::(times: number) -> Operator<T>', IterableOperator.prototype.repeat)
  ])('%s', (_, repeat) => {
    it('lazy evaluation', () => {
      const iter = new MarkIterable()
      const times = 2

      const result = repeat(iter, times)
      const isEval1 = iter.isEvaluated()
      toArray(result)
      const isEval2 = iter.isEvaluated()

      expect(isEval1).toBe(false)
      expect(isEval2).toBe(true)
    })

    describe('times > 0', () => {
      it('return repeated iterable', () => {
        const iter = [1, 2, 3]
        const times = 2

        const result = repeat(iter, times)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 2, 3, 1, 2, 3])
      })
    })

    describe('times = 0', () => {
      it('return empty iterable', () => {
        const iter = [1, 2, 3]
        const times = 0

        const result = repeat(iter, times)
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('times < 0', () => {
      it('throw InvalidArgumentError', () => {
        const iter = [1, 2, 3]
        const times = -1

        const err = getSyncError<InvalidArgumentError>(() => repeat(iter, times))

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('times')
      })
    })

    describe('times = Infinity', () => {
      describe('NODE_ENV = production', () => {
        it('show infinite loop warning', () => {
          const OLD_NODE_ENV = process.env.NODE_ENV
          process.env.NODE_ENV = 'production'
          const spy = jest.spyOn(console, 'warn').mockImplementation()
          const iter: number[] = [1, 2, 3]

          const result = repeat(iter, Infinity)
          const isIter = isIterable(result)

          expect(isIter).toBe(true)
          expect(console.warn).toHaveBeenCalledTimes(0)

          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        })
      })

      describe('NODE_ENV != production', () => {
        it('show infinite loop warning', () => {
          const OLD_NODE_ENV = process.env.NODE_ENV
          process.env.NODE_ENV = 'development'
          const spy = jest.spyOn(console, 'warn').mockImplementation()
          const iter: number[] = [1, 2, 3]

          const result = repeat(iter, Infinity)
          const isIter = isIterable(result)

          expect(isIter).toBe(true)
          expect(console.warn).toHaveBeenCalledTimes(1)

          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        })
      })
    })
  })
})
