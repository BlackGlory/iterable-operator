import * as output from '@output/to-array-async'
import { toArrayAsync } from '@style/pipeline/output/to-array-async'
import { toAsyncIterable } from '@test/utils'

describe('toArrayAsync<T>(): (iterable: AsyncIterable<T>) => Promise<T[]>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'toArrayAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = toArrayAsync()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
