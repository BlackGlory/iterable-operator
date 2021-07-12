import * as middleware from '@middleware/drop-right-async'
import { dropRightAsync } from '@style/binding/middleware/drop-right-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  dropRightAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'dropRightAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropRightAsync.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
