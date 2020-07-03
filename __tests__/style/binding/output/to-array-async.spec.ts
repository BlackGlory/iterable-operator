import * as output from '@output/to-array-async'
import { toArrayAsync } from '@style/binding/output/to-array-async'
import { toAsyncIterable } from '@test/utils'

describe('toArrayAsync<T>(this: AsyncIterable<T>): Promise<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'toArrayAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = toArrayAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
