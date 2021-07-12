import * as middleware from '@middleware/split-by-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::splitByAsync(
    predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterableOperator<T[]>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'splitByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).splitByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::splitByAsync(
    predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterableOperator<T[]>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'splitByAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).splitByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
