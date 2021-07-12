import * as middleware from '@middleware/take-right-async'
import { takeRightAsync } from '@style/pipeline/middleware/take-right-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  takeRightAsync<T>(count: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'takeRightAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = takeRightAsync(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
