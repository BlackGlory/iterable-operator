import * as middleware from '@middleware/split-async'
import { splitAsync } from '@style/binding/middleware/split-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  splitAsync<T>(
    this: AsyncIterable<T>
  , separator: T
  ): AsyncIterableIterator<T[]>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'splitAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const separator = 1

    const result = splitAsync.call(iter, separator)

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
