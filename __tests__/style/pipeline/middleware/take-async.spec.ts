import * as middleware from '@middleware/take-async'
import { takeAsync } from '@style/pipeline/middleware/take-async'
import { toAsyncIterable } from '@test/utils'

describe('takeAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'takeAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = takeAsync(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
