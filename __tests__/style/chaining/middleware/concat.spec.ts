import * as middleware from '@middleware/concat'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::concat<U>(...iterables: Array<Iterable<unknown>>): IterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'concat')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const io = new IterableOperator(iter).concat(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
