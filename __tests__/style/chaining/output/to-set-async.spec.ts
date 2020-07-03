import * as output from '@output/to-set-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::toSetAsync(): Promise<Set<T>>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'toSetAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = new AsyncIterableOperator(iter).toSetAsync()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
  })
})
