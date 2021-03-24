import * as output from '@output/some-async'
import { someAsync } from '@style/pipeline/output/some-async'

describe('someAsync<T>(predicate: (element: T, index: number) => unknown | Promise<unknown>): (iterable: Iterable<T> | AsyncIterable<T>) => PromiseLike<boolean>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'someAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = someAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
