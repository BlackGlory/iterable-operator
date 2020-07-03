import * as middleware from '@middleware/drop-async'
import { dropAsync } from '@style/binding/middleware/drop-async'
import { toAsyncIterable } from '@test/utils'

describe('dropAsync<T>(this: AsyncIterable<T>, count: number): AsyncIterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'dropAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const count = 1

    const result = dropAsync.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
