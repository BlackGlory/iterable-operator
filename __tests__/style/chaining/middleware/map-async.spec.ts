import * as middleware from '@middleware/map-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::mapAsync<U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): AsyncIterableOperator<U>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'mapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).mapAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::mapAsync<U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): AsyncIterableOperator<U>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'mapAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).mapAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
