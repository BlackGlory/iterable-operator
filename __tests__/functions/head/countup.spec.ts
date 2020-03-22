import { isIterable, toArray } from '@test/utils'
import { countup } from '@head/countup'

describe('countup', () => {
  describe('(begin: number, end: number) -> Iterable<number>', () => {
    describe('begin < end', () => {
      it('return iterable[begin:end]', () => {
        const iter = countup(-2, 2)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([-2, -1, 0, 1, 2])
      })
    })

    describe('begin = end', () => {
      it('return iterable[begin]', () => {
        const iter = countup(0, 0)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([0])
      })
    })

    describe('begin > end', () => {
      it('return empty iterable', () => {
        const iter = countup(1, 0)

        const isIter = isIterable(iter)
        const arrResult = toArray(iter)

        expect(isIter).toBe(true)
        expect(arrResult).toEqual([])
      })
    })
  })
})
