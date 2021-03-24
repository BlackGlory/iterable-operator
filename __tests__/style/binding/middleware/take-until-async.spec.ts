import * as middleware from '@middleware/take-until-async'
import { takeUntilAsync } from '@style/binding/middleware/take-until-async'

describe('takeUntilAsync<T>(this: Iterable<T> | AsyncIterable<T>, predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): AsyncIterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'takeUntilAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = takeUntilAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
