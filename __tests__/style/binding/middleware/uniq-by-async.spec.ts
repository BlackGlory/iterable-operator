import * as middleware from '@middleware/uniq-by-async'
import { uniqByAsync } from '@style/binding/middleware/uniq-by-async'

describe(`
  uniqByAsync<T, U>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<U>
  ): AsyncIterable<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'uniqByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = uniqByAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
