import * as middleware from '@middleware/take-until-async'
import { takeUntilAsync } from '@style/pipeline/middleware/take-until-async'

describe(`
  takeUntilAsync<T>(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterableIterator<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'takeUntilAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = takeUntilAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
