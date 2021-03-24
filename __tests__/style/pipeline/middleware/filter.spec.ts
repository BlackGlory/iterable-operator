import * as middleware from '@middleware/filter'
import { filter } from '@style/pipeline/middleware/filter'
import '@blackglory/jest-matchers'

describe('filter<T, U extends T = T>(predicate: (element: T, index: number) => unknown): (iterable: Iterable<T>) => Iterable<U>', () => {
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
