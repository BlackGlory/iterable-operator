import * as output from '@output/last-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::lastAsync(): Promise<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'lastAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = new AsyncIterableOperator(iter).lastAsync()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
