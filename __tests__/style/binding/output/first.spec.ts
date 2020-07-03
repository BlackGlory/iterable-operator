import * as output from '@output/first'
import { first } from '@style/binding/output/first'

describe('first<T>(this: Iterable<T>): T', () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'first')
    const iter = [1, 2, 3]

    const result = first.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
