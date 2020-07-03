import * as output from '@output/match'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::match(sequence: ArrayLike<T>): boolean', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'match')
    const iter = [1, 2, 3]
    const sequence = [1, 2, 3]

    const result = new IterableOperator(iter).match(sequence)

    expect(spy).toBeCalledWith(iter, sequence)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
