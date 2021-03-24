import * as output from '@output/every'
import { every } from '@style/pipeline/output/every'

describe('every<T>(predicate: (element: T, index: number) => unknown): (iterable: Iterable<T>) => boolean', () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'every')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = every(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
