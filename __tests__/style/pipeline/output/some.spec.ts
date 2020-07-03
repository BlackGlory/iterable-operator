import * as output from '@output/some'
import { some } from '@style/pipeline/output/some'

describe('some<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => boolean', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'some')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = some(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
