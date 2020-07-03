import * as output from '@output/to-array'
import { toArray } from '@style/pipeline/output/to-array'

describe('toArray<T>(): (iterable: Iterable<T>) => T[]', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'toArray')
    const iter = [1, 2, 3]

    const result = toArray()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
