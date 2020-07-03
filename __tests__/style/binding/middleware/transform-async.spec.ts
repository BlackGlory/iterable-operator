import * as middleware from '@middleware/transform-async'
import { transformAsync } from '@style/binding/middleware/transform-async'
import { toAsyncIterable } from '@test/utils'

describe('transformAsync<T, U>(this: Iterable<T>, transformer: (iterable: Iterable<T>) => AsyncIterable<U>): AsyncIterable<U>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = [1, 2, 3]
    const transformer = () => toAsyncIterable(iter)

    const result = transformAsync.call<Iterable<number>, [typeof transformer], AsyncIterable<number>>(iter, transformer)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('transformAsync<T, U>(this: AsyncIterable<T>, transformer: (iterable: AsyncIterable<T>) => AsyncIterable<U>): AsyncIterable<U>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const transformer = () => iter

    const result = transformAsync.call(iter, transformer)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
