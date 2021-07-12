import * as middleware from '@middleware/transform-async'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe(`
  IterableOperator<T, U extends Iterable<T>>::transformAsync<T>(
    transformer: (iterable: Iterable<U>) => AsyncIterable<T>
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = [1, 2, 3]
    const transformer = () => toAsyncIterable(iter)

    const io = new IterableOperator(iter).transformAsync(transformer)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T, U extends Iterable<T>>::transformAsync<T>(
    transformer: (iterable: AsyncIterable<U>) => AsyncIterable<T>
  ): AsyncIterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'transformAsync')
    const iter = toAsyncIterable([1, 2, 3])
    const transformer = () => iter

    const io = new AsyncIterableOperator(iter).transformAsync(transformer)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
