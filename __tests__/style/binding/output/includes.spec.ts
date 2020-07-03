import * as output from '@output/includes'
import { includes } from '@style/binding/output/includes'

describe('includes<T>(this: Iterable<T>, value: T): boolean', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'includes')
    const iter = [1, 2, 3]
    const value = 1

    const result = includes.call(iter, value)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
