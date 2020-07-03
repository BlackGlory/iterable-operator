import * as middleware from '@middleware/flatten-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::flattenAsync<U>(): AsyncIterable<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const io = new AsyncIterableOperator(iter).flattenAsync()
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
