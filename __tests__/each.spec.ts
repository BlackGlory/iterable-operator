import { getError } from 'return-style'
import { each } from '@src/each'

describe('each', () => {
  test('called fn with [element, index]', () => {
    const iter = [1, 2, 3]
    const fn = jest.fn()

    each(iter, fn)

    expect(fn).toBeCalledTimes(3)
    expect(fn).nthCalledWith(1, 1, 0)
    expect(fn).nthCalledWith(2, 2, 1)
    expect(fn).nthCalledWith(3, 3, 2)
  })

  it('calls fn once for each iterable element', () => {
    const iter = [1, 2, 3]
    const sideResult: Array<[number, number]> = []
    const pushToSideResult = (x: number, i: number) => sideResult.push([x, i])

    const result = each(iter, pushToSideResult)

    expect(result).toBeUndefined()
    expect(sideResult).toEqual([[1, 0], [2, 1], [3, 2]])
  })

  describe('fn throws an error', () => {
    it('throws an error', () => {
      const customError = new Error('CustomError')
      const iter = [1, 2, 3]
      const fn = () => { throw customError }

      const err = getError(() => each(iter, fn))

      expect(err).toBe(customError)
    })
  })
})
