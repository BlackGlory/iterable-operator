import * as middleware from '@middleware/filter-async'
import { filterAsync } from '@style/binding/middleware/filter-async'

describe(`
  filterAsync<T, U extends T = T>(
    this: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => Awaitable<unknown>
  ): AsyncIterable<U>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'filterAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = filterAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
