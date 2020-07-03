import * as output from '@output/find'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::find(fn: (element: T, index: number) => boolean): T', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'find')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).find(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
