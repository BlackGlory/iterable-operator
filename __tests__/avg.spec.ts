import { test, expect } from 'vitest'
import { avg } from '@src/avg.js'

test('avg', () => {
  const iter = [1, 2, 3]

  const result = avg(iter)

  expect(result).toBe(2)
})
