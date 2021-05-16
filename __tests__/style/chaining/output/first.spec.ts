import * as output from '@output/first'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::first(): T | undefined', () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'first')
    const iter = [1, 2, 3]

    const result = new IterableOperator(iter).first()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
