import * as output from '@output/consume'
import { IterableOperator, AsyncIterableOperator } from '@style/chaining'
import { toAsyncIterable } from '@test/utils'

describe('IterableOperator<T>::consume<U>(consumer: (iterable: Iterable<T>) => U): U', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'consume')
    const iter = [1, 2, 3]
    const consumer = () => true

    const result = new IterableOperator(iter).consume(consumer)

    expect(spy).toBeCalledWith(iter, consumer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  AsyncIterableOperator<T>::consume<U>(consumer: (iterable: AsyncIterable<T>) => U): U
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'consume')
    const iter = toAsyncIterable([1, 2, 3])
    const consumer = () => true

    const result = new AsyncIterableOperator(iter).consume(consumer)

    expect(spy).toBeCalledWith(iter, consumer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
