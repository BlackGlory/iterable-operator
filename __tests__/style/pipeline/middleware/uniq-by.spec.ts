import * as middleware from '@middleware/uniq-by'
import { uniqBy } from '@style/pipeline/middleware/uniq-by'
import '@blackglory/jest-matchers'

describe(`
  uniqBy<T, U>(fn: (element: T, index: number) => U): (iterable: Iterable<T>) => Iterable<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'uniqBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = uniqBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
