import * as output from '@output/reduce'
import { reduce } from '@style/pipeline/output/reduce'

describe('reduce<T, U>(fn: (accumulator: U, currentValue: T, index: number) => U, initialValue: U): (iterable: Iterable<T>) => U', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'reduce')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initialValue = 1

    const result = reduce(fn, initialValue)(iter)

    expect(spy).toBeCalledWith(iter, fn, initialValue)
    expect(spy).toReturnWith(result)
  })
})
