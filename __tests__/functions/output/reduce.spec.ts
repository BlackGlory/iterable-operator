import { getError } from 'return-style'
import { reduce } from '@output/reduce'
import { MockIterable } from '@test/utils'

describe(`
  reduce<T>(
    iterable: Iterable<T>
  , fn: (accumulator: T, currentValue: T, index: number) => T)
  ): T
`, () => {
  test('close unexhausted iterator', () => {
    const iter = new MockIterable([1, 2, 3])

    try {
      reduce(iter, () => {
        throw new Error()
      })
    } catch {}

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  describe('fn is called', () => {
    it('called with [accumulator,currentValue,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()
        .mockReturnValueOnce(1 + 2)
        .mockReturnValueOnce(1 + 2 + 3)

      reduce(iter, fn)

      expect(fn).toBeCalledTimes(2)
      expect(fn).nthCalledWith(1, 1, 2, 1)
      expect(fn).nthCalledWith(2, 1 + 2, 3, 2)
    })
  })

  describe('size(iterable) = 0', () => {
    describe('call', () => {
      it('throw Error', () => {
        const iter: number[] = []
        const fn = (acc: number, cur: number) => acc + cur

        const err = getError(() => reduce(iter, fn))

        expect(err).toBeInstanceOf(Error)
      })
    })
  })

  describe('size(iterable) = 1', () => {
    describe('call', () => {
      it('return the element without calling fn', () => {
        const iter: number[] = [1]
        const fn = jest.fn()

        const result = reduce(iter, fn)

        expect(fn.mock.calls.length).toBe(0) // skip
        expect(result).toBe(1)
      })
    })
  })

  describe('size(iterable) > 1', () => {
    describe('call', () => {
      it('return result from reduction', () => {
        const iter = [1, 2, 3]
        const fn = (acc: number, cur: number) => acc + cur

        const result = reduce(iter, fn)

        expect(result).toBe(6)
      })
    })

    describe('fn throw error', () => {
      it('throw error', () => {
        const customError = new Error('CustomError')
        const iter = [1, 2, 3]
        const fn = () => { throw customError }

        const err = getError(() => reduce(iter, fn))

        expect(err).toBeInstanceOf(Error)
        expect(err!.message).toBe('CustomError')
      })
    })
  })
})

describe(`
  reduce(
    iterable: Iterable<T>
  , fn: (accumulator: U, currentValue: T, index: number) => U
  , initalValue: U
  ) => U
`, () => {
  test('close unexhausted iterator', () => {
    const iter = new MockIterable([1, 2, 3])

    try {
      reduce(iter, () => {
        throw new Error()
      }, 1)
    } catch {}

    expect(iter.returnCalled).toBeTruthy()
    expect(iter.done).toBeTruthy()
  })

  describe('fn is called', () => {
    it('called with [accumulator,currentValue,index]', () => {
      const iter = [1, 2, 3]
      const fn = jest.fn()
        .mockReturnValueOnce(0 + 1)
        .mockReturnValueOnce(0 + 1 + 2)
        .mockReturnValueOnce(0 + 1 + 2 + 3)
      const initalValue = 0

      reduce(iter, fn, initalValue)

      expect(fn).toBeCalledTimes(3)
      expect(fn).nthCalledWith(1, 0, 1, 0)
      expect(fn).nthCalledWith(2, 0 + 1, 2, 1)
      expect(fn).nthCalledWith(3, 0 + 1 + 2, 3, 2)
    })
  })

  describe('call', () => {
    it('return result from reduction', () => {
      const iter = [1, 2, 3]
      const pushToAcc = (acc: Array<[number, number]>, cur: number, index: number) => {
        acc.push([cur, index])
        return acc
      }
      const initalValue: Array<[number, number]> = []

      const result = reduce(iter, pushToAcc, initalValue)

      expect(result).toEqual([[1, 0], [2, 1], [3, 2]])
    })
  })
})
