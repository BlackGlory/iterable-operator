import * as output from '@output/first-async'
import { firstAsync } from '@style/binding/output/first-async'
import { toAsyncIterable } from '@test/utils'

describe('firstAsync<T>(this: AsyncIterable<T>): Promise<T | undefined>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'firstAsync')
    const iter = toAsyncIterable([1, 2, 3])

    const result = firstAsync.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
