import * as middleware from '@middleware/uniq'
import { uniq } from '@style/pipeline/middleware/uniq'
import '@test/matchers'

describe('uniq<T>(): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'uniq')
    const iter = [1, 2, 3]

    const result = uniq()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
