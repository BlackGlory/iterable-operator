import * as output from '@output/match-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::matchAsync(sequence: ArrayLike<T>): Promise<boolean>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'matchAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const sequence = [1, 2, 3]

    const result = new AsyncIterableOperator(iter).matchAsync(sequence)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
