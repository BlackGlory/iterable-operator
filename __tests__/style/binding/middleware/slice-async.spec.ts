import * as middleware from '@middleware/slice-async'
import { sliceAsync } from '@style/binding/middleware/slice-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  sliceAsync<T>(
    this: AsyncIterable<T>
  , start: number
  , end: number
  ): AsyncIterable<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'sliceAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const start = 1
    const end = 2

    const result = sliceAsync.call(iter, start, end)

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
