import * as middleware from '@middleware/drop-async'
import { dropAsync } from '@style/pipeline/middleware/drop-async'
import { toAsyncIterable } from '@test/utils'

describe('dropAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'dropAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropAsync(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
