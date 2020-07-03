import * as middleware from '@middleware/split-by-async'
import { splitByAsync } from '@style/binding/middleware/split-by-async'

describe('splitByAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'splitByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = splitByAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
