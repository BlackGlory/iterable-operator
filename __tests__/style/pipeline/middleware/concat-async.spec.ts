import * as middleware from '@middleware/concat-async'
import { concatAsync } from '@style/pipeline/middleware/concat-async'

describe('concatAsync<TResult>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): (iterable: Iterable<unknown | PromiseLike<unknown>> | AsyncIterable<unknown>) => AsyncIterable<TResult>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'concatAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = concatAsync(...iterables)(iter)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
