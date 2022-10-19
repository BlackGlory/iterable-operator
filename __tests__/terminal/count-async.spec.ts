import { toAsyncIterable } from '@test/utils'
import { countAsync } from '@terminal/count-async'

test('countAsync(iterable: AsyncIterable<unknown>): Promise<number>', async () => {
  const iter = toAsyncIterable([1, 2, 3])

  const result = await countAsync(iter)

  expect(result).toBe(3)
})
