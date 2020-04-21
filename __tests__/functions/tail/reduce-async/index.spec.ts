import { getAsyncError } from '@test/return-style'
import { isPromise } from 'extra-promise'
import { RuntimeError } from '@src/error'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction, testCall, testPipe, testBind } from '@test/test-fixtures'
import { reduceAsync as call } from '@tail/reduce-async'
import { reduceAsync as pipe } from '@style/pipeline/tail/reduce-async'
import { reduceAsync as bind } from '@style/binding/tail/reduce-async'
import { getCalledTimes } from '@test/utils'

describe('reduceAsync', () => {
  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> Promise<T>', call)
  , testPipe('(fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> (iterable: Iterable<T> | AsyncIterable<T>) -> Promise<T>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> Promise<T>', bind)
  ])('%s', (_, reduceAsync) => {
    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> Promise<T>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (accumulator: T, currentValue: T, index: number) -> T | PromiseLike<T>) -> Promise<T>')
    ])('%s', (_, getIter) => {
      describe('fn is called', () => {
        it('called with [accumulator,currentValue,index]', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn()
            .mockReturnValueOnce(1 + 2)
            .mockReturnValueOnce(1 + 2 + 3)

          await reduceAsync(iter, fn)

          expect(fn).toBeCalledTimes(2)
          expect(fn).nthCalledWith(1, 1, 2, 1)
          expect(fn).nthCalledWith(2, 1 + 2, 3, 2)
        })
      })

      describe.each([
        testFunction('fn return non-promise')
      , testAsyncFunction('fn return promise')
      ])('%s', (_, getFn) => {
        describe('size(iterable) = 0', () => {
          describe('call', () => {
            it('throw RuntimeError', async () => {
              const iter = getIter([])
              const fn = getFn((acc: number, cur: number) => acc + cur)

              const err = await getAsyncError<RuntimeError>(() => reduceAsync(iter, fn))

              expect(err).toBeInstanceOf(RuntimeError)
            })
          })
        })

        describe('size(iterable) = 1', () => {
          describe('call', () => {
            it('return the element without calling fn', async () => {
              const iter = getIter([1])
              const fn = jest.fn()

              const result = reduceAsync(iter, fn)
              const isPro = isPromise(result)
              const proResult = await result

              expect(isPro).toBe(true)
              expect(getCalledTimes(fn)).toBe(0) // skip
              expect(proResult).toBe(1)
            })
          })
        })

        describe('size(iterable) > 1', () => {
          describe('call', () => {
            it('return result from reduction', async () => {
              const iter = getIter([1, 2, 3])
              const fn = getFn((acc: number, cur: number ) => acc + cur)

              const result = reduceAsync(iter, fn)
              const isPro = isPromise(result)
              const proResult = await result

              expect(isPro).toBe(true)
              expect(proResult).toBe(6)
            })
          })

          describe('fn throw error', () => {
            it('throw error', async () => {
              const customError = new Error('CustomError')
              const iter = [1, 2, 3]
              const fn = () => { throw customError }

              const err = await getAsyncError(() => reduceAsync(iter, fn))

              expect(err).toBe(customError)
            })
          })
        })
      })
    })
  })

  describe.each([
    testCall('(iterable: Iterable<T> | AsyncIterable<T>, fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> Promise<U>', call)
  , testPipe('(fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> (iterable: Iterable<T> | AsyncIterable<T>) -> Promise<U>', pipe)
  , testBind('(this: Iterable<T> | AsyncIterable<T>, fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> Promise<U>', bind)
  ])('%s', (_, reduceAsync) => {
    describe('(iterable: Iterable<PromiseLike<T>>, fn: (accumulator: U, currentValue: PromiseLike<T>, index: number) -> U | PromiseLike<U>, initialValue: U) -> Promise<U>', () => {
      describe('fn is called', () => {
        it('called with [accumulator,currentValue(promise),index]', async () => {
          const iter = [Promise.resolve(), Promise.resolve(), Promise.resolve()]
          const fn = jest.fn().mockReturnValue([])

          await reduceAsync(iter, fn, [])

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, [], iter[0], 0)
          expect(fn).nthCalledWith(2, [], iter[1], 1)
          expect(fn).nthCalledWith(3, [], iter[2], 2)
        })
      })
    })

    describe.each([
      testIterable('(iterable: Iterable<T>, fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> Promise<U>')
    , testAsyncIterable('(iterable: AsyncIterable<T>, fn: (accumulator: U, currentValue: T, index: number) -> U | PromiseLike<U>, initalValue: U) -> Promise<U>')
    ])('%s', (_, getIter) => {
      describe('fn is called', () => {
        it('called with [accumulator,currentValue,index]', async () => {
          const iter = getIter([1, 2, 3])
          const fn = jest.fn()
            .mockReturnValueOnce(0 + 1)
            .mockReturnValueOnce(0 + 1 + 2)
            .mockReturnValueOnce(0 + 1 + 2 + 3)
          const initalValue = 0

          await reduceAsync(iter, fn, initalValue)

          expect(fn).toBeCalledTimes(3)
          expect(fn).nthCalledWith(1, 0, 1, 0)
          expect(fn).nthCalledWith(2, 0 + 1, 2, 1)
          expect(fn).nthCalledWith(3, 0 + 1 + 2, 3, 2)
        })
      })

      describe.each([
        testFunction('fn return non-promise')
      , testAsyncFunction('fn return promise')
      ])('%s', (_, getFn) => {
        describe('call', () => {
          it('return result from reduction', async () => {
            const iter = getIter([1, 2, 3])
            const pushToAcc = getFn((acc: Array<[number, number]>, cur: number, index: number) => {
              acc.push([cur, index])
              return acc
            })
            const initalValue: Array<[number, number]> = []

            const result = reduceAsync(iter, pushToAcc, initalValue)
            const isPro = isPromise(result)
            const proResult = await result

            expect(isPro).toBe(true)
            expect(proResult).toEqual([[1, 0], [2, 1], [3, 2]])
          })
        })
      })
    })
  })
})
