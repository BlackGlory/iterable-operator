import * as output from '@output/to-set'
import { toSet } from '@style/pipeline/output/to-set'

describe('toSet<T>(): (iterable: Iterable<T>) => Set<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'toSet')
    const iter = [1, 2, 3]

    const result = toSet()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
