import * as output from '@output/find'
import { find } from '@style/pipeline/output/find'

describe(`
  find<T>(
    predicate: (element: T, index: number) => unknown
  ): (iterable: Iterable<T>) => T | undefined
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'find')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = find(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
