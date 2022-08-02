import * as middleware from '@middleware/map-async'
import { mapAsync } from '@style/pipeline/middleware/map-async'

describe(`
  mapAsync<T, U>(
    fn: (element: T, index: number) => Awaitable<U>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => AsyncIterable<U>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'mapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = mapAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
