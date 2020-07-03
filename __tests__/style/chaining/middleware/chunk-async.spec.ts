import * as middleware from '@middleware/chunk-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::chunkAsync(size: number): AsyncIterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'chunkAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const size = 1

    const io = new AsyncIterableOperator(iter).chunkAsync(size)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
