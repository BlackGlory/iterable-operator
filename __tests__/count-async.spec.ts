import { toAsyncIterable } from '@test/utils.js'
import { countAsync } from '@src/count-async.js'

test('countAsync', async () => {
  const iter = toAsyncIterable([1, 2, 3])

  const result = await countAsync(iter)

  expect(result).toBe(3)
})
