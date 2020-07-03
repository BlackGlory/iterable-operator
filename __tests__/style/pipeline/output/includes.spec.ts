import * as output from '@output/includes'
import { includes } from '@style/pipeline/output/includes'

describe('includes<T>(value: T): (iterable: Iterable<T>) => boolean', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'includes')
    const iter = [1, 2, 3]
    const value = 1

    const result = includes(value)(iter)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
