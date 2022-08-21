import * as middleware from '@middleware/take-right-async'
import { takeRightAsync } from '@style/binding/middleware/take-right-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  takeRightAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'takeRightAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = takeRightAsync.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
