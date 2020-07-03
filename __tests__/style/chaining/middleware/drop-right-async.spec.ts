import * as middleware from '@middleware/drop-right-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::dropRightAsync(count: number): AsyncIterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'dropRightAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const io = new AsyncIterableOperator(iter).dropRightAsync(count)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
