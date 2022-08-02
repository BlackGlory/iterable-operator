import * as middleware from '@middleware/concat-async'
import { concatAsync } from '@style/pipeline/middleware/concat-async'

describe(`
  concatAsync<T, U>(
    ...iterables: Array<Iterable<Awaitable<U>> | AsyncIterable<U>>
  ): (
    ...iterables: Array<Iterable<Awaitable<T>> | AsyncIterable<T>>
  ) => AsyncIterable<T | U>
`, () => {
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
