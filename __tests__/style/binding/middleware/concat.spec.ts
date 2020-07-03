import * as middleware from '@middleware/concat'
import { concat } from '@style/binding/middleware/concat'
import '@test/matchers'

describe('concat<T>(this: Iterable<unknown>, ...iterables: Array<Iterable<unknown>>): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'concat')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = concat.call(iter, ...iterables)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})