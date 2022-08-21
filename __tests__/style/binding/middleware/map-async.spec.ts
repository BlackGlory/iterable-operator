import * as middleware from '@middleware/map-async'
import { mapAsync } from '@style/binding/middleware/map-async'

describe(`
  mapAsync<T, U>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => Awaitable<U>
  ): AsyncIterableIterator<U>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'mapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = mapAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
