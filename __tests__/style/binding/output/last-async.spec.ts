import * as output from '@output/last-async'
import { lastAsync } from '@style/binding/output/last-async'
import { toAsyncIterable } from '@test/utils'

describe('lastAsync<T>(this: AsyncIterable<T>): Promise<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'lastAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = lastAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
