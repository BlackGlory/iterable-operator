import * as output from '@output/count'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::count(): number', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'count')
    const iter = [1, 2, 3]

    const result = new IterableOperator(iter).count()

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
