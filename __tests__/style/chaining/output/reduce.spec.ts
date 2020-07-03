import * as output from '@output/reduce'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::reduce<U>(fn: (accumulator: U, currentValue: T, index: number) => U, initialValue: U): U', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'reduce')
    const iter = [1, 2, 3]
    const fn = () => 1
    const initialValue = 1

    const result = new IterableOperator(iter).reduce(fn, initialValue)

    expect(spy).toBeCalledWith(iter, fn, initialValue)
    expect(spy).toReturnWith(result)
  })
})
