import * as output from '@output/to-set-async'
import { toSetAsync } from '@style/pipeline/output/to-set-async'
import { toAsyncIterable } from '@test/utils'

describe('toSetAsync<T>(): (iterable: AsyncIterable<T>) => Promise<Set<T>>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'toSetAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = toSetAsync()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
  })
})
