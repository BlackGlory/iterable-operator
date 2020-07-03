import * as output from '@output/last'
import { last } from '@style/pipeline/output/last'

describe('last<T>(): (iterable: Iterable<T>) => T', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'last')
    const iter = [1, 2, 3]

    const result = last()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
