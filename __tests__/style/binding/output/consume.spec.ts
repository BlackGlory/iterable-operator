import * as output from '@output/consume'
import { consume } from '@style/binding/output/consume'
import { toAsyncIterable } from '@test/utils'

describe(`
  consume<T, U>(this: Iterable<T>, consumer: (iterable: Iterable<T>) => U): U
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'consume')
    const iter = [1, 2, 3]
    const consumer = () => true

    const result = consume.call(iter, consumer)

    expect(spy).toBeCalledWith(iter, consumer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})

describe(`
  consume<T, U>(this: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) => U): U
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'consume')
    const iter = toAsyncIterable([1, 2, 3])
    const consumer = () => true

    const result = consume.call(iter, consumer)

    expect(spy).toBeCalledWith(iter, consumer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
