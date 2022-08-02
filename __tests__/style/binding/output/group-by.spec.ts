import * as output from '@output/group-by'
import { groupBy } from '@style/binding/output/group-by'

describe(`
  groupBy<T, U>(this: Iterable<T>, fn: (element: T, index: number) => U): Map<U, T[]>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'groupBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = groupBy.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
