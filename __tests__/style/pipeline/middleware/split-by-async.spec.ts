import * as middleware from '@middleware/split-by-async'
import { splitByAsync } from '@style/pipeline/middleware/split-by-async'

describe(`
  splitByAsync<T>(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'splitByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = splitByAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
