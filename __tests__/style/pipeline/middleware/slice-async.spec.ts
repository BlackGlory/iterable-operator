import * as middleware from '@middleware/slice-async'
import { sliceAsync } from '@style/pipeline/middleware/slice-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  sliceAsync<T>(
    start: number
  , end: number
  ): (iterable: AsyncIterable<T>) => AsyncIterableIterator<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'sliceAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const start = 1
    const end = 2

    const result = sliceAsync(start, end)(iter)

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
