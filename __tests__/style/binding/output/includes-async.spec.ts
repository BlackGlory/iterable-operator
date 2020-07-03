import * as output from '@output/includes-async'
import { includesAsync } from '@style/binding/output/includes-async'
import { toAsyncIterable } from '@test/utils'

describe('includesAsync<T>(this: AsyncIterable<T>, value: T): Promise<boolean>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'includesAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const value = 1

    const result = includesAsync.call(iter, value)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
