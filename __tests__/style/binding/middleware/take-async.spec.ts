import * as middleware from '@middleware/take-async'
import { takeAsync } from '@style/binding/middleware/take-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  takeAsync<T>(
    this: AsyncIterable<T>
  , count: number
  ): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'takeAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = takeAsync.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
