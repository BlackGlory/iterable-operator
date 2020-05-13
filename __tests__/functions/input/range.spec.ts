import { InvalidArgumentError } from '@src/error'
import { toArray } from '@test/utils'
import { getError } from 'return-style'
import { range } from '@input/range'
import '@test/matchers'

describe('range(start: number, end: number): Iterable<number>', () => {
  describe('start = end', () => {
    it('return empty iterable', () => {
      const iter = range(1, 1)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('start < end', () => {
    it('return iterable[start:end-1]', () => {
      const iter = range(-2, 2)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([-2, -1, 0, 1])
    })
  })

  describe('start > end', () => {
    it('return iterable[start:end+1]', () => {
      const iter = range(2, -2)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([2, 1, 0, -1])
    })
  })
})

describe('range(start: number, end: number, step: number) => Iterable<number>', () => {
  describe('step > 0', () => {
    it('return iterable[start:end] by step', () => {
      const iter = range(1, -1, 0.5)
      const arrResult = toArray(iter)

      expect(iter).toBeIterable()
      expect(arrResult).toEqual([1, 0.5, 0, -0.5])
    })
  })

  describe('step = 0', () => {
    it('throw InvalidArgumentError', () => {
      const fn = () => range(2, -2, 0)

      const err = getError<InvalidArgumentError>(fn)

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('step')
    })
  })

  describe('step < 0', () => {
    it('throw InvalidArgumentError', () => {
      const fn = () => range(2, -2, -0.5)

      const err = getError<InvalidArgumentError>(fn)

      expect(err).toBeInstanceOf(InvalidArgumentError)
      expect(err!.message).toMatch('step')
    })
  })
})
