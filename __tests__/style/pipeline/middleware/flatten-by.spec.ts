import * as middleware from '@middleware/flatten-by'
import { flattenBy } from '@style/pipeline/middleware/flatten-by'
import '@blackglory/jest-matchers'

describe(`
  flattenBy<T>(
    predicate: (element: unknown, level: number) => unknown
  ): (iterable: Iterable<unknown>) => Iterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'flattenBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = flattenBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
