import * as output from '@output/each-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::eachAsync(
    fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<void>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'eachAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).eachAsync(fn)

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
    const spy = jest.spyOn(output, 'eachAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => true

    const result = new AsyncIterableOperator(iter).eachAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
