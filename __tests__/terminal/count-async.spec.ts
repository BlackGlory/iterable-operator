import { toAsyncIterable } from '@test/utils'
import { countAsync } from '@terminal/count-async'

test('countAsync', async () => {
  const iter = toAsyncIterable([1, 2, 3])

  const result = await countAsync(iter)

  expect(result).toBe(3)
})
