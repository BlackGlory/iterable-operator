import * as output from '@output/count-async'
import { AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('AsyncIterableOperator<T>::countAsync(): Promise<number>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'countAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = new AsyncIterableOperator(iter).countAsync()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
  })
})
