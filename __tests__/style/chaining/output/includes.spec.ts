import * as output from '@output/includes'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::includes(value: T): boolean', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'includes')
    const iter = [1, 2, 3]
    const value = 1

    const result = new IterableOperator(iter).includes(value)

    expect(spy).toBeCalledWith(iter, value)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
