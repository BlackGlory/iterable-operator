import { toArray } from '@test/utils.js'
import { toSet } from '@src/to-set.js'

describe('toSet', () => {
  it('returns a set', () => {
    const iter = [1, 1, 2, 2, 3, 3]

    const result = toSet(iter)
    const arrResult = toArray(result)

    expect(result).toBeInstanceOf(Set)
    expect(arrResult).toEqual([1, 2, 3])
  })
})
