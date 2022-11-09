import { toAsyncIterable } from '@test/utils'
import { countAsync } from '@src/count-async'

test('countAsync', async () => {
  const iter = toAsyncIterable([1, 2, 3])

  const result = await countAsync(iter)

  expect(result).toBe(3)
})
