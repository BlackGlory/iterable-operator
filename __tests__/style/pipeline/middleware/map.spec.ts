import * as middleware from '@middleware/map'
import { map } from '@style/pipeline/middleware/map'
import '@test/matchers'

describe('map<T, U>(fn: (element: T, index: number) => U): (iterable: Iterable<T>) => Iterable<U>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'map')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = map(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
