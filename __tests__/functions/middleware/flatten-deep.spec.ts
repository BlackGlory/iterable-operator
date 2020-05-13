import { getError } from 'return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { toArray, MarkIterable } from '@test/utils'
import { flattenDeep as call } from '@middleware/flatten-deep'
import { flattenDeep as pipe } from '@style/pipeline/middleware/flatten-deep'
import { flattenDeep as bind } from '@style/binding/middleware/flatten-deep'
import { IterableOperator } from '@style/chaining/iterable-operator'
import '@test/matchers'

describe.each([
  testCall('flattenDeep<T>(iterable: Iterable<unknown>, depth: number): Iterable<T>', call)
, testPipe('flattenDeep<T>(depth: number): (iterable: Iterable<unknown>) => Iterable<T>', pipe)
, testBind('flattenDeep<T>(this: Iterable<unknown>, depth: number): Iterable<T>', bind)
, testIterableChain('IterableOperator<unknown>::flattenDeep<T>(depth: number): IterableOperator<T>', IterableOperator.prototype.flattenDeep)
])('%s', (_, flattenDeep) => {
  it('lazy evaluation', () => {
    const iter = new MarkIterable()
    const depth = Infinity

    const result = flattenDeep(iter, depth)
    const isEval1 = iter.isEvaluated()
    toArray(result)
    const isEval2 = iter.isEvaluated()

    expect(isEval1).toBe(false)
    expect(isEval2).toBe(true)
  })

  describe('iterable is empty', () => {
    it('return empty iterable', () => {
      const iter: number[] = []
      const depth = Infinity

      const result = flattenDeep(iter, depth)
      const arrResult = toArray(result)

      expect(result).toBeIterable()
      expect(arrResult).toEqual([])
    })
  })

  describe('iterable isnt empty', () => {
    describe('iterable is string', () => {
      it('return iterable<char>', () => {
        const iter = '123'
        const depth = Infinity

        const result = flattenDeep(iter, depth)
        const arrResult = toArray(result)

        expect(result).toBeIterable()
        expect(arrResult).toEqual(['1', '2', '3'])
      })
    })

    describe('iterable isnt string', () => {
      describe('depth < 0', () => {
        it('throw InvalidArgumentError', () => {
          const iter: number[] = []
          const depth = -1

          const err = getError<InvalidArgumentError>(() => flattenDeep(iter, depth))

          expect(err).toBeInstanceOf(InvalidArgumentError)
          expect(err!.message).toMatch('depth')
        })
      })

      describe('depth = 0', () => {
        it('return iterable copy', () => {
          const iter = [0, [1]]
          const depth = 0

          const result = flattenDeep(iter, depth)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(result).not.toBe(iter)
          expect(arrResult).toEqual([0, [1]])
        })
      })

      describe('depth > 0', () => {
        it('return flat iterable', () => {
          const iter = [
            'one', ['two', ['three']]
          , 0, [1, [2, [3]]]
          ]
          const depth = 2

          const result = flattenDeep(iter, depth)
          const arrResult = toArray(result)

          expect(result).toBeIterable()
          expect(arrResult).toEqual([
            'o','n','e', 't','w','o', 'three'
          , 0, 1, 2, [3]
          ])
        })
      })
    })
  })
})