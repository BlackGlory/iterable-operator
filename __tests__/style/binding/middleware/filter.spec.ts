import * as middleware from '@middleware/filter'
import { filter } from '@style/binding/middleware/filter'
import '@blackglory/jest-matchers'

describe('filter<T, U extends T = T>(this: Iterable<T>, predicate: (element: T, index: number) => unknown): Iterable<U>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'filter')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = filter.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
