import * as middleware from '@middleware/flatten-async'
import { flattenAsync } from '@style/binding/middleware/flatten-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  flattenAsync<T>(this: AsyncIterable<unknown>): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flattenAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = flattenAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
