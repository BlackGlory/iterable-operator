import * as middleware from '@middleware/take-right'
import { takeRight } from '@style/binding/middleware/take-right'
import '@test/matchers'

describe('takeRight<T>(this: Iterable<T>, count: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'takeRight')
    const iter = [1, 2, 3]
    const count = 1

    const result = takeRight.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
