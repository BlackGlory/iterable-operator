import * as middleware from '@middleware/drop-until-async'
import { dropUntilAsync } from '@style/pipeline/middleware/drop-until-async'

describe(`
  dropUntilAsync<T>(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'dropUntilAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = dropUntilAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
