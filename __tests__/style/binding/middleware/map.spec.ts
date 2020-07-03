import * as middleware from '@middleware/map'
import { map } from '@style/binding/middleware/map'
import '@test/matchers'

describe('map<T, U>(this: Iterable<T>, fn: (element: T, index: number) => U): Iterable<U>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'map')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = map.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
