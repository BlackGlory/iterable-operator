import { getErrorPromise } from 'return-style'
import { testIterable, testAsyncIterable, testFunction, testAsyncFunction }
  from '@test/test-fixtures'
import { reduceAsync } from '@output/reduce-async'
import { getCalledTimes, MockIterable, MockAsyncIterable } from '@test/utils'
import '@blackglory/jest-matchers'

describe(`
  reduceAsync<T>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (accumulator: T, currentValue: T, index: number) => T | PromiseLike<T>
  ): Promise<T>
`, () => {
  describe('close unexhausted iterator', () => {
    test('iterable', async () => {
      const iter = new MockAsyncIterable([1, 2, 3])

      try {
        await reduceAsync(iter, () => {
          throw new Error()
        })
      } catch {}

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })

    test('async iterable', async () => {
      const iter = new MockIterable([1, 2, 3])

      try {
        await reduceAsync(iter, () => {
          throw new Error()
        })
      } catch {}

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })
  })

  describe.each([
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
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
          it('throw Error', async () => {
            const iter = getIter([])
            const fn = getFn((acc: number, cur: number) => acc + cur)

            const err = await getErrorPromise(reduceAsync(iter, fn))

            expect(err).toBeInstanceOf(Error)
          })
        })
      })

      describe('size(iterable) = 1', () => {
        describe('call', () => {
          it('return the element without calling fn', async () => {
            const iter = getIter([1])
            const fn = jest.fn()

            const result = reduceAsync(iter, fn)
            const proResult = await result

            expect(result).toBePromise()
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
            const proResult = await result

            expect(result).toBePromise()
            expect(proResult).toBe(6)
          })
        })

        describe('fn throw error', () => {
          it('throw error', async () => {
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

describe(`
  reduceAsync<T, U>(
    iterable: Iterable<T> | AsyncIterable<T>
  , fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
  , initalValue: U
  ): Promise<U>
`, () => {
  describe('close unexhausted iterator', () => {
    test('iterable', async () => {
      const iter = new MockAsyncIterable([1, 2, 3])

      try {
        await reduceAsync(iter, () => {
          throw new Error()
        }, 1)
      } catch {}

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })

    test('async iterable', async () => {
      const iter = new MockIterable([1, 2, 3])

      try {
        await reduceAsync(iter, () => {
          throw new Error()
        }, 1)
      } catch {}

      expect(iter.returnCalled).toBeTruthy()
      expect(iter.done).toBeTruthy()
    })
  })

  describe('T is PromiseLike<T>', () => {
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
    testIterable('Iterable<T>')
  , testAsyncIterable('AsyncIterable<T>')
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
          const proResult = await result

          expect(result).toBePromise()
          expect(proResult).toEqual([[1, 0], [2, 1], [3, 2]])
        })
      })
    })
  })
})
