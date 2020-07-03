import * as middleware from '@middleware/chunk-by-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::chunkByAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'chunkByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).chunkByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('AsyncIterableOperator<T>::chunkByAsync(fn: (element: T, index: number) => boolean | PromiseLike<boolean>): AsyncIterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'chunkByAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const io = new AsyncIterableOperator(iter).chunkByAsync(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
