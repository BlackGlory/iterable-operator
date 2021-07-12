import * as middleware from '@middleware/chunk-async'
import { chunkAsync } from '@style/pipeline/middleware/chunk-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  chunkAsync<T>(size: number): (iterable: AsyncIterable<T>) => AsyncIterable<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'chunkAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const size = 1

    const result = chunkAsync(size)(iter)

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
