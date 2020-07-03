import * as output from '@output/first-async'
import { firstAsync } from '@style/pipeline/output/first-async'
import { toAsyncIterable } from '@test/utils'

describe('firstAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'firstAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = firstAsync()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
