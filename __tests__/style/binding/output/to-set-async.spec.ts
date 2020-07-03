import * as output from '@output/to-set-async'
import { toSetAsync } from '@style/binding/output/to-set-async'
import { toAsyncIterable } from '@test/utils'

describe('toSetAsync<T>(this: AsyncIterable<T>): Promise<Set<T>>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'toSetAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = toSetAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
  })
})
