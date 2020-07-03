import * as middleware from '@middleware/flatten'
import { flatten } from '@style/binding/middleware/flatten'
import '@test/matchers'

describe('flatten<T>(this: Iterable<unknown>): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flatten')
    const iter = [1, 2, 3]

    const result = flatten.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
