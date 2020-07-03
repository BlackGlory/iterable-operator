import * as output from '@output/last'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::last(): T', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'last')
    const iter = [1, 2, 3]

    const result = new IterableOperator(iter).last()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
