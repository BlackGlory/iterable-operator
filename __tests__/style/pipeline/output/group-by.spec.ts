import * as output from '@output/group-by'
import { groupBy } from '@style/pipeline/output/group-by'

describe(`
  groupBy<T, U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): (iterable: Iterable<T>) => Map<U, T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'groupBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = groupBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
