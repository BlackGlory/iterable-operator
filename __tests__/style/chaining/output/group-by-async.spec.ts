import * as output from '@output/group-by-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::groupByAsync<U>(
    fn: (element: T, index: number) => U | PromiseLike<U>
  ): Promise<Map<U, T[]>>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'groupByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).groupByAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::eachAsync(
    fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<void>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'groupByAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const result = new AsyncIterableOperator(iter).groupByAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
