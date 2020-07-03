import * as output from '@output/to-array'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::toArray(): T[]', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'toArray')
    const iter = [1, 2, 3]

    const result = new IterableOperator(iter).toArray()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
