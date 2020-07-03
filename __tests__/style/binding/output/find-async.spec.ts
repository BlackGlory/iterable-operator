import * as output from '@output/find-async'
import { findAsync } from '@style/binding/output/find-async'

describe('findAsync<T>(this: Iterable<T> | AsyncIterable<T>, fn: (element: T, index: number) => boolean | PromiseLike<boolean>): Promise<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'findAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = findAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})