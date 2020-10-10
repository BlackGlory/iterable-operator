import * as middleware from '@middleware/tap'
import { tap } from '@style/pipeline/middleware/tap'
import '@blackglory/jest-matchers'

describe('tap<T>(fn: (element: T, index: number) => unknown): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'tap')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = tap(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
