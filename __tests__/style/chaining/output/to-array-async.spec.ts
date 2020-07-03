import * as output from '@output/to-array-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::toArrayAsync(): Promise<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'toArrayAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = new AsyncIterableOperator(iter).toArrayAsync()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
