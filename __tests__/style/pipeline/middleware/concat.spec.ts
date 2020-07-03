import * as middleware from '@middleware/concat'
import { concat } from '@style/pipeline/middleware/concat'
import '@test/matchers'

describe('concat<T>(...iterables: Iterable<unknown>[]): (iterable: Iterable<unknown>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'concat')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = concat(...iterables)(iter)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
