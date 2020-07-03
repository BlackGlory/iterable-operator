import * as output from '@output/find'
import { find } from '@style/binding/output/find'

describe('find<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): T', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'find')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = find.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
