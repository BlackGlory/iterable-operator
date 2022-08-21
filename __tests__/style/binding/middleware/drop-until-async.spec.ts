import * as middleware from '@middleware/drop-until-async'
import { dropUntilAsync } from '@style/binding/middleware/drop-until-async'

describe(`
  dropUntilAsync<T>(
    this: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'dropUntilAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = dropUntilAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
