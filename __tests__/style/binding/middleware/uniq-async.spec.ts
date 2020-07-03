import * as middleware from '@middleware/uniq-async'
import { uniqAsync } from '@style/binding/middleware/uniq-async'
import { toAsyncIterable } from '@test/utils'

describe('uniqAsync<T>(this: AsyncIterable<T>): AsyncIterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'uniqAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = uniqAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
