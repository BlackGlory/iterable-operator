import * as output from '@output/to-set'
import { toSet } from '@style/binding/output/to-set'

describe('toSet<T>(this: Iterable<T>): Set<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'toSet')
    const iter = [1, 2, 3]

    const result = toSet.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
