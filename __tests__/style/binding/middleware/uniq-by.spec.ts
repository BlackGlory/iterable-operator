import * as middleware from '@middleware/uniq-by'
import { uniqBy } from '@style/binding/middleware/uniq-by'
import '@blackglory/jest-matchers'

describe(`
  uniqBy<T, U>(
    this: Iterable<T>
  , fn: (element: T, index: number) => U
  ): IterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'uniqBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = uniqBy.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
