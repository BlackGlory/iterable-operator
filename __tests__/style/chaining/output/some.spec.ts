import * as output from '@output/some'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::some(fn: (element: T, index: number) => boolean): boolean', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'some')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).some(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
