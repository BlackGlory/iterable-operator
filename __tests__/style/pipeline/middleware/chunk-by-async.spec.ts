import * as middleware from '@middleware/chunk-by-async'
import { chunkByAsync } from '@style/pipeline/middleware/chunk-by-async'

describe('chunkByAsync<T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<T[]>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'chunkByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = chunkByAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
