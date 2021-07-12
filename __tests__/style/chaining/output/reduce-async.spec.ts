import * as output from '@output/reduce-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T>::reduceAsync<U>(
    fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
  , initialValue: U
  ): Promise<U>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'reduceAsync')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initalValue = 1

    const result = new IterableOperator(iter).reduceAsync(fn, initalValue)

    expect(spy).toBeCalledWith(iter, fn, initalValue)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::reduceAsync<U>(
    fn: (accumulator: U, currentValue: T, index: number) => U | PromiseLike<U>
  , initialValue: U
  ): Promise<U>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'reduceAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const fn = () => 1
    const initalValue = 1

    const result = new AsyncIterableOperator(iter).reduceAsync(fn, initalValue)

    expect(spy).toBeCalledWith(iter, fn, initalValue)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
