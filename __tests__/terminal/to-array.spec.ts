import { toArray } from '@terminal/to-array'

describe('toArray', () => {
  it('returns an array', () => {
    const iter = [1, 2, 3]

    const result = toArray(iter)

    expect(result).toEqual([1, 2, 3])
  })
})
