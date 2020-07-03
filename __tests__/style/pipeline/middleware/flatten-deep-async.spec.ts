import * as middleware from '@middleware/flatten-deep-async'
import { flattenDeepAsync } from '@style/pipeline/middleware/flatten-deep-async'
import { toAsyncIterable } from '@test/utils'

describe('flattenDeepAsync<T>(depth: number): (iterable: AsyncIterable<unknown>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeepAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const depth = 1

    const result = flattenDeepAsync(depth)(iter)

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
