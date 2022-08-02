import * as output from '@output/group-by'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::groupBy<U>(fn: (element: T, index: number) => U): Map<U, T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'groupBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).groupBy(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
