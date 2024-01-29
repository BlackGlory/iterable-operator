import { getErrorPromise } from 'return-style'
import { testIterable, testIterablePromises, testAsyncIterable, testFunction, testAsyncFunction }
  from '@test/test-fixtures.js'
import { reduceAsync } from '@src/reduce-async.js'
import { getCalledTimes, MockIterable, MockAsyncIterable } from '@test/utils.js'
import { pass } from '@blackglory/pass'
import { jest } from '@jest/globals'

describe('reduceAsync', () => {
  describe('without initialValue', () => {
    describe('close unexhausted iterator', () => {
      test('Iterable', async () => {
        const iter = new MockAsyncIterable([1, 2, 3])

        try {
          await reduceAsync(iter, () => {
          throw new Error()
          })
        } catch {
          pass()
        }

        expect(iter.returnCalled).toBeTruthy()
        expect(iter.done).toBeTruthy()
      })

      test('AsyncIterable', async () => {
        const iter = new MockIterable([1, 2, 3])

        try {
          await reduceAsync(iter, () => {
          throw new Error()
          })
        } catch {
          pass()
        }

        expect(iter.returnCalled).toBeTruthy()
        expect(iter.done).toBeTruthy()
      })
    })

    describe.each([
      testIterable('Iterable')
    , testIterablePromises('IterablePromises')
    , testAsyncIterable('AsyncIterable')
    ])('%s', (_, createIter) => {
      test('called fn with [accumulator, currentValue, index]', async () => {
        const iter = createIter([1, 2, 3])
        const fn = jest.fn()
          .mockReturnValueOnce(1 + 2)
          .mockReturnValueOnce(1 + 2 + 3)

        await reduceAsync(iter, fn)

        expect(fn).toBeCalledTimes(2)
        expect(fn).nthCalledWith(1, 1, 2, 1)
        expect(fn).nthCalledWith(2, 1 + 2, 3, 2)
      })

      describe.each([
        testFunction('fn returns NonPromiseLike')
      , testAsyncFunction('fn returns PromiseLike')
      ])('%s', (_, createFn) => {
        describe('size(iterable) = 0', () => {
          it('throws an error', async () => {
            const iter = createIter([])
            const fn = createFn((acc: number, cur: number) => acc + cur)

            const err = await getErrorPromise(reduceAsync(iter, fn))

            expect(err).toBeInstanceOf(Error)
          })
        })

        describe('size(iterable) = 1', () => {
          it('returns the element without calling fn', async () => {
            const iter = createIter([1])
            const fn = jest.fn()

            const result = await reduceAsync(iter, fn)

            expect(getCalledTimes(fn)).toBe(0) // skip
            expect(result).toBe(1)
          })
        })

        describe('size(iterable) > 1', () => {
          it('returns the result from reduction', async () => {
            const iter = createIter([1, 2, 3])
            const fn = createFn((acc: number, cur: number ) => acc + cur)

            const result = await reduceAsync(iter, fn)

            expect(result).toBe(6)
          })

          describe('fn throws an error', () => {
            it('throws an error', async () => {
              const customError = new Error('CustomError')
              const iter = [1, 2, 3]
              const fn = () => { throw customError }

              const err = await getErrorPromise(reduceAsync(iter, fn))

              expect(err).toBe(customError)
            })
          })
        })
      })
    })
  })

  describe('with initialValue', () => {
    describe('close the unexhausted iterator', () => {
      test('Iterable', async () => {
        const iter = new MockAsyncIterable([1, 2, 3])

        try {
          await reduceAsync(iter, () => {
          throw new Error()
          }, 1)
        } catch {
          pass()
        }

        expect(iter.returnCalled).toBeTruthy()
        expect(iter.done).toBeTruthy()
      })

      test('async iterable', async () => {
        const iter = new MockIterable([1, 2, 3])

        try {
          await reduceAsync(iter, () => {
          throw new Error()
          }, 1)
        } catch {
          pass()
        }

        expect(iter.returnCalled).toBeTruthy()
        expect(iter.done).toBeTruthy()
      })
    })

    describe.each([
      testIterable('Iterable')
    , testIterablePromises('IterablePromises')
    , testAsyncIterable('AsyncIterable')
    ])('%s', (_, createIter) => {
      it('called fn with [accumulator, currentValue, index]', async () => {
        const iter = createIter([1, 2, 3])
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

      describe.each([
        testFunction('fn returns NonPromiseLike')
      , testAsyncFunction('fn returns PromiseLike')
      ])('%s', (_, createFn) => {
        describe('call', () => {
          it('returns result from reduction', async () => {
            const iter = createIter([1, 2, 3])
            const pushToAcc = createFn((acc: Array<[number, number]>, cur: number, index: number) => {
              acc.push([cur, index])
              return acc
            })
            const initalValue: Array<[number, number]> = []

            const result = await reduceAsync(iter, pushToAcc, initalValue)

            expect(result).toEqual([[1, 0], [2, 1], [3, 2]])
          })
        })
      })
    })
  })
})
