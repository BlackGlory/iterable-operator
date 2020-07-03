import * as middleware from '@middleware/split-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::splitAsync(separator: T): AsyncIterable<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'splitAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const separator = 1

    const io = new AsyncIterableOperator(iter).splitAsync(separator)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
