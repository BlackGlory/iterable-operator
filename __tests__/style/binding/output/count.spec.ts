import * as output from '@output/count'
import { count } from '@style/binding/output/count'

describe('count(this: Iterable<unknown>): number', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'count')
    const iter = [1, 2, 3]

    const result = count.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
