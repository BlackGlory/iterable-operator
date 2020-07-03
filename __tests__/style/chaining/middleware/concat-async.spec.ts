import * as middleware from '@middleware/concat-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::concatAsync<U>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'concatAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const io = new IterableOperator(iter).concatAsync(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('AsyncIterableOperator<T>::concatAsync<U>(...iterables: Array<Iterable<unknown> | AsyncIterable<unknown>>): AsyncIterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'concatAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const iterables = [[1, 2, 3]]

    const io = new AsyncIterableOperator(iter).concatAsync(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
