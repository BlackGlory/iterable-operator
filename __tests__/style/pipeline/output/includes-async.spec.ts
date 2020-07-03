import * as output from '@output/includes-async'
import { includesAsync } from '@style/pipeline/output/includes-async'
import { toAsyncIterable } from '@test/utils'

describe('includesAsync<T>(value: T): (iterable: AsyncIterable<T>) => Promise<boolean>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'includesAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const value = 1

    const result = includesAsync(value)(iter)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
