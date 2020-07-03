import * as middleware from '@middleware/filter'
import { filter } from '@style/pipeline/middleware/filter'
import '@test/matchers'

describe('filter<T, U extends T = T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<U>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'filter')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = filter(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
