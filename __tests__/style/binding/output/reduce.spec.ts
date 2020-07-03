import * as output from '@output/reduce'
import { reduce } from '@style/binding/output/reduce'

describe('reduce<T, U>(this: Iterable<T>, fn: (accumulator: U, currentValue: T, index: number) => U, initialValue: U): U', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'reduce')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initialValue = 1

    const result = reduce.call(iter, fn, initialValue)

    expect(spy).toBeCalledWith(iter, fn, initialValue)
    expect(spy).toReturnWith(result)
  })
})
