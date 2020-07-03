import * as output from '@output/find'
import { find } from '@style/pipeline/output/find'

describe('find<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => T', () => {
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
