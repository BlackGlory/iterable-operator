import * as middleware from '@middleware/filter-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::filterAsync<U extends T = T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'filterAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).filterAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('AsyncIterableOperator<T>::filterAsync<U extends T = T>(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'filterAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).filterAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
