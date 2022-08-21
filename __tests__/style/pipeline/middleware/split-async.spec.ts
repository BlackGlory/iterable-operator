import * as middleware from '@middleware/split-async'
import { splitAsync } from '@style/pipeline/middleware/split-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  splitAsync<T>(
    separator: T
  ): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'splitAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const separator = 1

    const result = splitAsync(separator)(iter)

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
