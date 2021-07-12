import * as middleware from '@middleware/flatten-deep-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  AsyncIterableOperator<T>::flattenDeepAsync<T>(
    depth: number
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeepAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const depth = 1

    const io = new AsyncIterableOperator(iter).flattenDeepAsync(depth)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
