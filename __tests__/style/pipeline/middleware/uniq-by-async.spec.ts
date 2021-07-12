import * as middleware from '@middleware/uniq-by-async'
import { uniqByAsync } from '@style/pipeline/middleware/uniq-by-async'

describe(`
  uniqByAsync<T, U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'uniqByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = uniqByAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
