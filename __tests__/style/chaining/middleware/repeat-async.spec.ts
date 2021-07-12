import * as middleware from '@middleware/repeat-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  AsyncIterableOperator<T>::repeatAsync(times: number): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'repeatAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const times = 1

    const io = new AsyncIterableOperator(iter).repeatAsync(times)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
