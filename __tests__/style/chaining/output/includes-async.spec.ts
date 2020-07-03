import * as output from '@output/includes-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::includesAsync(value: T): Promise<boolean>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'includesAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const value = 1

    const result = new AsyncIterableOperator(iter).includesAsync(value)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
