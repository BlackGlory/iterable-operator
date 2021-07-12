import * as middleware from '@middleware/flatten-by-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::flattenByAsync<T>(
    predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
  ): AsyncIterable<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).flattenByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::flattenByAsync<T>(
    predicate: (element: unknown, level: number) => unknown | PromiseLike<unknown>
  ): AsyncIterable<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenByAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).flattenByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
