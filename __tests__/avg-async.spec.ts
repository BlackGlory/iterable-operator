import { test, expect } from 'vitest'
import { toAsyncIterable } from '@test/utils.js'
import { avgAsync } from '@src/avg-async.js'

test('avgAsync', async () => {
  const iter = toAsyncIterable([1, 2, 3])

  const result = await avgAsync(iter)

  expect(result).toBe(2)
})
