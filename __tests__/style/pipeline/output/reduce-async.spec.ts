import * as output from '@output/reduce-async'
import { reduceAsync } from '@style/pipeline/output/reduce-async'

describe(`
  reduceAsync<T, U>(
    fn: (accumulator: U, currentValue: T, index: number) => Awaitable<U>
  , initialValue: U
  ): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<U>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'reduceAsync')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initalValue = 1

    const result = reduceAsync(fn, initalValue)(iter)

    expect(spy).toBeCalledWith(iter, fn, initalValue)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
