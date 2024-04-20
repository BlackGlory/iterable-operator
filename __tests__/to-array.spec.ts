import { describe, it, expect } from 'vitest'
import { toArray } from '@src/to-array.js'

describe('toArray', () => {
  it('returns an array', () => {
    const iter = [1, 2, 3]

    const result = toArray(iter)

    expect(result).toEqual([1, 2, 3])
  })
})
