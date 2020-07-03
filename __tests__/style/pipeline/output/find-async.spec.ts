import * as output from '@output/find-async'
import { findAsync } from '@style/pipeline/output/find-async'

describe('findAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'findAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = findAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
