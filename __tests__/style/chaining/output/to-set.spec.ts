import * as output from '@output/to-set'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::toSet(): Set<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'toSet')
    const iter = [1, 2, 3]

    const result = new IterableOperator(iter).toSet()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
