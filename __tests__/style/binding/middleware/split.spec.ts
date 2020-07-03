import * as middleware from '@middleware/split'
import { split } from '@style/binding/middleware/split'
import '@test/matchers'

describe('split<T>(this: Iterable<T>, separator: T): Iterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'split')
    const iter = [1, 2, 3]
    const separator = 1

    const result = split.call(iter, separator)

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
