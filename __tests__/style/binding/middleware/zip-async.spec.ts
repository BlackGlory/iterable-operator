import * as middleware from '@middleware/zip-async'
import { zipAsync } from '@style/binding/middleware/zip-async'

describe('zipAsync<T>(this: Iterable<unknown | PromiseLike<unknown>> | AsyncIterable<unknown>, ...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>): AsyncIterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'zipAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zipAsync.call(iter, ...iterables)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
