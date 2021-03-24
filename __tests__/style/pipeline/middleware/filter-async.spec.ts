import * as middleware from '@middleware/filter-async'
import { filterAsync } from '@style/pipeline/middleware/filter-async'

describe('filterAsync<T, U extends T = T>(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'filterAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = filterAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
