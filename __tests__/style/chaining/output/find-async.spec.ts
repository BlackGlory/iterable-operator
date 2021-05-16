import * as output from '@output/find-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::findAsync(
    predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<T | undefined>`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'findAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).findAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::findAsync(
    predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<T | undefined>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'findAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const result = new AsyncIterableOperator(iter).findAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
