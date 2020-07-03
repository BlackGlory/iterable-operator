import * as middleware from '@middleware/uniq-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::uniqAsync(): AsyncIterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'uniqAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const io = new AsyncIterableOperator(iter).uniqAsync()
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
