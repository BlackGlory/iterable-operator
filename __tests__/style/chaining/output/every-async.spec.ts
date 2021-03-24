import * as output from '@output/every-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::everyAsync(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'everyAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).everyAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe('AsyncIterableOperator<T>::everyAsync(predicate: (element: T, index: number) => unknown | PromiseLike<unknown>): Promise<boolean>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'everyAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const result = new AsyncIterableOperator(iter).everyAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
