import * as middleware from '@middleware/split-by'
import { splitBy } from '@style/pipeline/middleware/split-by'

describe(`
  splitBy<T>(
    predicate: (element: T, index: number) => unknown
  ): (iterable: Iterable<T>) => IterableIterator<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'splitBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = splitBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
