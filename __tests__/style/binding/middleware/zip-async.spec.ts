import * as middleware from '@middleware/zip-async'
import { zipAsync } from '@style/binding/middleware/zip-async'

describe(`
  zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
    this: Iterable<Awaitable<T>> | AsyncIterable<T>
  , ...iterables: U
  ): AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'zipAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zipAsync.call(iter, ...iterables)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
