import { InvalidArgumentError } from '@src/error'
import { isIterable, toArray } from '@test/utils'
import { getSyncError } from '@test/return-style'
import { range } from '@head/range'

describe('range', () => {
  describe('(start: number, end: number) -> Iterable<number>', () => {
    describe('start = end', () => {
      it('return empty iterable', () => {
        const iter = range(0, 0)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('start < end', () => {
      it('return iterable[start:end-1]', () => {
        const iter = range(-2, 2)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([-2, -1, 0, 1])
      })
    })

    describe('start > end', () => {
      it('return iterable[start:end+1]', () => {
        const iter = range(2, -2)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([2, 1, 0, -1])
      })
    })
  })

  describe('(start: number, end: number, step: number) -> Iterable<number>', () => {
    describe('step > 0', () => {
      it('return iterable[start:end] by step', () => {
        const iter = range(1, -1, 0.5)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([1, 0.5, 0, -0.5])
      })
    })

    describe('step = 0', () => {
      it('throw InvalidArgumentError', () => {
        const fn = () => range(2, -2, 0)

        const err = getSyncError<InvalidArgumentError>(fn)

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('step')
      })
    })

    describe('step < 0', () => {
      it('throw InvalidArgumentError', () => {
        const fn = () => range(2, -2, -0.5)

        const err = getSyncError<InvalidArgumentError>(fn)

        expect(err).toBeInstanceOf(InvalidArgumentError)
        expect(err!.message).toMatch('step')
      })
    })
  })
})
