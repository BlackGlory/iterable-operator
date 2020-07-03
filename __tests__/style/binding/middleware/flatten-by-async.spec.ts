import * as middleware from '@middleware/flatten-by-async'
import { flattenByAsync } from '@style/binding/middleware/flatten-by-async'

describe('flattenByAsync<T>(this: Iterable<unknown> | AsyncIterable<unknown>, fn: (element: unknown, level: number) => boolean | PromiseLike<unknown>): AsyncIterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flattenByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = flattenByAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
