import { describe, test, expect } from 'vitest'
import { avg } from '@src/avg.js'
import { getError } from 'return-style'

describe('avg', () => {
  test('general', () => {
    const iter: number[] = [1, 2, 3]

    const result = avg(iter)

    expect(result).toBe(2)
  })

  test('edge: empty iterable', () => {
    const iter: number[] = []

    const error = getError(() => avg(iter))

    expect(error).toBeInstanceOf(Error)
  })
})
