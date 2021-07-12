import * as middleware from '@middleware/transform-async'
import { transformAsync } from '@style/pipeline/middleware/transform-async'
import { toAsyncIterable } from '@test/utils'

describe(`
  transformAsync<T, U>(
    transformer: (iterable: Iterable<T>) => AsyncIterable<U>
  ): (iterable: Iterable<T>) => AsyncIterable<U>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = [1, 2, 3]
    const transformer = () => toAsyncIterable(iter)

    const result = transformAsync(transformer)(iter)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  transformAsync<T, U>(
    transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>
  ): (iterable: AsyncIterable<T>) => AsyncIterable<U>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const transformer = (iterable: AsyncIterable<number>) => iterable

    const result = transformAsync(transformer)(iter)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
