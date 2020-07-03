import * as middleware from '@middleware/drop-right-async'
import { dropRightAsync } from '@style/pipeline/middleware/drop-right-async'
import { toAsyncIterable } from '@test/utils'

describe('dropRightAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'dropRightAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropRightAsync(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
