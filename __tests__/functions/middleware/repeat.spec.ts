import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { getError } from 'return-style'
import { repeat as call } from '@middleware/repeat'
import { repeat as pipe } from '@style/pipeline/middleware/repeat'
import { repeat as bind } from '@style/binding/middleware/repeat'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('repeat<T>(iterable: Iterable<T>, times: number): Iterable<T>', call)
, testPipe('repeat<T>(times: number): (iterable: Iterable<T>) => Iterable<T>', pipe)
, testBind('repeat<T>(this: Iterable<T>, times: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<T>::repeat(times: number) => IterableOperator<T>', IterableOperator.prototype.repeat)
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
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('return empty iterable', () => {
      const iter = [1, 2, 3]
      const times = 0

      const result = repeat(iter, times)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('times < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = [1, 2, 3]
      const times = -1

      const err = getError<InvalidArgumentError>(() => repeat(iter, times))

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

        try {
          const result = repeat(iter, Infinity)

          expect(result).toBeIterable()
          expect(console.warn).toHaveBeenCalledTimes(0)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })

    describe('NODE_ENV != production', () => {
      it('show infinite loop warning', () => {
        const OLD_NODE_ENV = process.env.NODE_ENV
        process.env.NODE_ENV = 'development'
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const iter: number[] = [1, 2, 3]

        try {
          const result = repeat(iter, Infinity)

          expect(result).toBeIterable()
          expect(console.warn).toHaveBeenCalledTimes(1)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })
  })
})
