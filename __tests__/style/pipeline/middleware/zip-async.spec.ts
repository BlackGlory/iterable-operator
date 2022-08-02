import * as middleware from '@middleware/zip-async'
import { zipAsync } from '@style/pipeline/middleware/zip-async'

describe(`
  zipAsync<T, U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(
    ...iterables: U
  ): (
    iterable: Iterable<Awaitable<T>> | AsyncIterable<T>
  ) => AsyncIterable<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'zipAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zipAsync(...iterables)(iter)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
