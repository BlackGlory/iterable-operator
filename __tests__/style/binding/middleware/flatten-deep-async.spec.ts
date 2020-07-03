import * as middleware from '@middleware/flatten-deep-async'
import { flattenDeepAsync } from '@style/binding/middleware/flatten-deep-async'
import { toAsyncIterable } from '@test/utils'

describe('flattenDeepAsync<T>(this: AsyncIterable<unknown>, depth: number): AsyncIterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeepAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const depth = 1

    const result = flattenDeepAsync.call(iter, depth)

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
