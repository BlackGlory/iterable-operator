import * as output from '@output/some'
import { some } from '@style/binding/output/some'

describe('some<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): boolean', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'some')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = some.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
