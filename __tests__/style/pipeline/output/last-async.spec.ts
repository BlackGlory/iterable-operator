import * as output from '@output/last-async'
import { lastAsync } from '@style/pipeline/output/last-async'
import { toAsyncIterable } from '@test/utils'

describe('lastAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'lastAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = lastAsync()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
