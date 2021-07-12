import * as middleware from '@middleware/repeat-async'
import { repeatAsync } from '@style/pipeline/middleware/repeat-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  repeatAsync<T>(times: number): (iterable: AsyncIterable<T>) => AsyncIterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'repeatAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const times = 1

    const result = repeatAsync(times)(iter)

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
