import * as output from '@output/to-array'
import { toArray } from '@style/binding/output/to-array'

describe('toArray<T>(this: Iterable<T>): T[]', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'toArray')
    const iter = [1, 2, 3]

    const result = toArray.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
