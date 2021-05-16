import * as output from '@output/last'
import { last } from '@style/binding/output/last'

describe('last<T>(this: Iterable<T>): T | undefined', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'last')
    const iter = [1, 2, 3]

    const result = last.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
