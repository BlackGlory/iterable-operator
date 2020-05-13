import { getError } from 'return-style'
import { toArrayAsync, toAsyncIterable, MarkAsyncIterable } from '@test/utils'
import { testCall, testPipe, testBind, testAsyncIterableChain } from '@test/test-fixtures'
import { InvalidArgumentError } from '@src/error'
import { repeatAsync as call } from '@middleware/repeat-async'
import { repeatAsync as pipe } from '@style/pipeline/middleware/repeat-async'
import { repeatAsync as bind } from '@style/binding/middleware/repeat-async'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'
import '@test/matchers'

describe.each([
  testCall('repeatAsync<T>(iterable: AsyncIterable<T>, times: number): AsyncIterable<T>', call)
, testPipe('repeatAsync<T>(times: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', pipe)
, testBind('repeatAsync<T>(this: AsyncIterable<T>, times: number): AsyncIterable<T>', bind)
, testAsyncIterableChain('AsyncIterableOperator<T>::repeatAsync(times: number): AsyncIterableOperaotr<T>', AsyncIterableOperator.prototype.repeatAsync)
])('%s', (_, repeatAsync) => {
  it('lazy evaluation', async () => {
    const iter = new MarkAsyncIterable()
    const times = 2

    const result = repeatAsync(iter, times)
    const isEval1 = iter.isEvaluated()
    await toArrayAsync(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('times > 0', () => {
    it('return repeated iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 2

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([1, 2, 3, 1, 2, 3])
    })
  })

  describe('times = 0', () => {
    it('return empty iterable', async () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = 0

      const result = repeatAsync(iter, times)
      const arrResult = await toArrayAsync(result)

      expect(result).toBeAsyncIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('times < 0', () => {
    it('throw InvalidArgumentError', () => {
      const iter = toAsyncIterable([1, 2, 3])
      const times = -1

      const err = getError<InvalidArgumentError>(() => repeatAsync(iter, times))

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
        const iter = toAsyncIterable([1, 2, 3])

        try {
          const result = repeatAsync(iter, Infinity)

          expect(result).toBeAsyncIterable()
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
        const iter = toAsyncIterable([1, 2, 3])

        try {
          const result = repeatAsync(iter, Infinity)

          expect(result).toBeAsyncIterable()
          expect(console.warn).toHaveBeenCalledTimes(1)
        } finally {
          spy.mockRestore()
          process.env.NODE_ENV = OLD_NODE_ENV
        }
      })
    })
  })
})
