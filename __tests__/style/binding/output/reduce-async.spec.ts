import * as output from '@output/reduce-async'
import { reduceAsync } from '@style/binding/output/reduce-async'

describe(`
  reduceAsync<T, U>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
  , initialValue: U
  ): Promise<U>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'reduceAsync')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initalValue = 1

    const result = reduceAsync.call(iter, fn, initalValue)

    expect(spy).toBeCalledWith(iter, fn, initalValue)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
