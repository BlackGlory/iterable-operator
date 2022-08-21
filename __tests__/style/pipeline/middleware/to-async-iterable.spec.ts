import * as middleware from '@middleware/to-async-iterable'
import { toAsyncIterable } from '@style/pipeline/middleware/to-async-iterable'

describe(`
  toAsyncIterable<T>(): (iterable: Iterable<Awaitable<T>>) => AsyncIterableIterator<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'toAsyncIterable')
    const iter = [1, 2, 3]

    const result = toAsyncIterable()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
