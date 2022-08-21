import * as middleware from '@middleware/repeat-async'
import { repeatAsync } from '@style/binding/middleware/repeat-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  repeatAsync<T>(this: AsyncIterable<T>, times: number): AsyncIterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'repeatAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const times = 1

    const result = repeatAsync.call(iter, times)

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
