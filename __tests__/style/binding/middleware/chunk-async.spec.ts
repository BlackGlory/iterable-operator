import * as middleware from '@middleware/chunk-async'
import { chunkAsync } from '@style/binding/middleware/chunk-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  chunkAsync<T>(this: AsyncIterable<T>, size: number): AsyncIterableIterator<T[]>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'chunkAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const size = 1

    const result = chunkAsync.call(iter, size)

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
