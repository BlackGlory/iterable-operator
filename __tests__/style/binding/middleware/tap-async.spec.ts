import * as middleware from '@middleware/tap-async'
import { tapAsync } from '@style/binding/middleware/tap-async'

describe(`
  tapAsync<T>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'tapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = tapAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
