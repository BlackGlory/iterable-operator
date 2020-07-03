import * as output from '@output/each'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::each(fn: (element: T, index: number) => unknown): void', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'each')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).each(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
