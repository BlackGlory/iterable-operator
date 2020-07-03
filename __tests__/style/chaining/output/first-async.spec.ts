import * as output from '@output/first-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::firstAsync(): Promise<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'firstAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = new AsyncIterableOperator(iter).firstAsync()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
