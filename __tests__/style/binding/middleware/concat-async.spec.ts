import * as middleware from '@middleware/concat-async'
import { concatAsync } from '@style/binding/middleware/concat-async'

describe(`concatAsync<T, U>(
  this: Iterable<T | PromiseLike<T>> | AsyncIterable<T>
, ...iterables: Array<Iterable<U | PromiseLike<U>> | AsyncIterable<U>>
): AsyncIterable<T | U>`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'concatAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = concatAsync.call(iter, ...iterables)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
