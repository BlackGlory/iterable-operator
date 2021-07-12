import * as middleware from '@middleware/tap-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::tapAsync(
    fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'tapAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).tapAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::tapAsync(
    fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'tapAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).tapAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
