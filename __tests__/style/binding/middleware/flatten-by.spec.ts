import * as middleware from '@middleware/flatten-by'
import { flattenBy } from '@style/binding/middleware/flatten-by'
import '@blackglory/jest-matchers'

describe('flattenBy<T>(this: Iterable<unknown>, fn: (element: unknown, level: number) => boolean): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flattenBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = flattenBy.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
