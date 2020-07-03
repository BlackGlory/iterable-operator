import * as middleware from '@middleware/flatten-by-async'
import { flattenByAsync } from '@style/pipeline/middleware/flatten-by-async'

describe('flattenByAsync<T>(fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): (iterable: Iterable<unknown> | AsyncIterable<unknown>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'flattenByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = flattenByAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
