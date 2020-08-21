import * as middleware from '@middleware/zip-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::zipAsync<U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(...iterables: U): AsyncIterableOperator<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'zipAsync')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const io = new IterableOperator(iter).zipAsync(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('AsyncIterableOperator<T>::zipAsync<U extends Array<Iterable<unknown> | AsyncIterable<unknown>>>(...iterables: U): AsyncIterableOperator<[T, ...ExtractTypeTupleFromAsyncLikeIterableTuple<U>]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'zipAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const iterables = [[1, 2, 3]]

    const io = new AsyncIterableOperator(iter).zipAsync(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
