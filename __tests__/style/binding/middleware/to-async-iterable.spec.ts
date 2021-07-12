import * as middleware from '@middleware/to-async-iterable'
import { toAsyncIterable } from '@style/binding/middleware/to-async-iterable'

describe(`
  toAsyncIterable<T>(iterable: Iterable<T | PromiseLike<T>>): AsyncIterable<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'toAsyncIterable')
    const iter = [1, 2, 3]

    const result = toAsyncIterable.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
