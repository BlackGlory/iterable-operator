import { getSyncError } from '@test/return-style'
import { InvalidArgumentError } from '@src/error'
import { testCall, testPipe, testBind, testIterableChain } from '@test/test-fixtures'
import { isIterable, toArray, MarkIterable } from '@test/utils'
import { flattenDeep as call } from '@body/flatten-deep'
import { flattenDeep as pipe } from '@style/pipeline/body/flatten-deep'
import { flattenDeep as bind } from '@style/binding/body/flatten-deep'
import { IterableOperator } from '@style/chaining/iterable-operator'

describe('flattenDeep', () => {
  describe.each([
    testCall('(iterable: Iterable<unknown>, depth: number) -> Iterable<T>', call)
  , testPipe('(depth: number) -> (iterable: Iterable<unknown>) -> Iterable<T>', pipe)
  , testBind('(this: Iterable<unknown>, depth: number) -> Iterable<T>', bind)
  , testIterableChain('Operator<unknown>::(depth: number) -> Operator<T>', IterableOperator.prototype.flattenDeep)
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
        const isIter = isIterable(result)
        const arrResult = toArray(result)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })

    describe('iterable isnt empty', () => {
      describe('iterable is string', () => {
        it('return iterable<char>', () => {
          const iter = '123'
          const depth = Infinity

          const result = flattenDeep(iter, depth)
          const isIter = isIterable(result)
          const arrResult = toArray(result)

          expect(isIter).toBe(true)
          expect(arrResult).toEqual(['1', '2', '3'])
        })
      })

      describe('iterable isnt string', () => {
        describe('depth < 0', () => {
          it('throw InvalidArgumentError', () => {
            const iter: number[] = []
            const depth = -1

            const err = getSyncError<InvalidArgumentError>(() => flattenDeep(iter, depth))

            expect(err).toBeInstanceOf(InvalidArgumentError)
            expect(err!.message).toMatch('depth')
          })
        })

        describe('depth = 0', () => {
          it('return iterable copy', () => {
            const iter = [0, [1]]
            const depth = 0

            const result = flattenDeep(iter, depth)
            const isIter = isIterable(result)
            const arrResult = toArray(result)

            expect(isIter).toBe(true)
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
            const isIter = isIterable(result)
            const arrResult = toArray(result)

            expect(isIter).toBe(true)
            expect(arrResult).toEqual([
              'o','n','e', 't','w','o', 'three'
            , 0, 1, 2, [3]
            ])
          })
        })
      })
    })
  })
})
