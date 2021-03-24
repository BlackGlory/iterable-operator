import * as middleware from '@middleware/chunk-by-async'
import { chunkByAsync } from '@style/binding/middleware/chunk-by-async'

describe('chunkByAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'chunkByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = chunkByAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
