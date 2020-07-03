import * as middleware from '@middleware/uniq-async'
import { uniqAsync } from '@style/pipeline/middleware/uniq-async'
import { toAsyncIterable } from '@test/utils'

describe('uniqAsync<T>(): (iterable: AsyncIterable<T>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'uniqAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = uniqAsync()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
