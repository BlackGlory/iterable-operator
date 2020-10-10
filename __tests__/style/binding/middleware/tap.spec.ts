import * as middleware from '@middleware/tap'
import { tap } from '@style/binding/middleware/tap'
import '@blackglory/jest-matchers'

describe('tap<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'tap')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = tap.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
