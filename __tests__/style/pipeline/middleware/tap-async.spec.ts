import * as middleware from '@middleware/tap-async'
import { tapAsync } from '@style/pipeline/middleware/tap-async'

describe(`
  tapAsync<T>(
    fn: (element: T, index: number) => Awaitable<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'tapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = tapAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
