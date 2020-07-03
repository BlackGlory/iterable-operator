import * as output from '@output/every'
import { every } from '@style/binding/output/every'

describe('every<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): boolean', () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'every')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = every.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
