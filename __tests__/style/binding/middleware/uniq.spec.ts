import * as middleware from '@middleware/uniq'
import { uniq } from '@style/binding/middleware/uniq'
import '@test/matchers'

describe('uniq<T>(this: Iterable<T>): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'uniq')
    const iter = [1, 2, 3]

    const result = uniq.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
