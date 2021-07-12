import * as middleware from '@middleware/slice-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  AsyncIterableOperator<T>::sliceAsync(
    start: number
  , end: number
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'sliceAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const start = 1
    const end = 2

    const io = new AsyncIterableOperator(iter).sliceAsync(start, end)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
