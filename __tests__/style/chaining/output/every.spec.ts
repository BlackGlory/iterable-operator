import * as output from '@output/every'
import { IterableOperator } from '@style/chaining'

describe(`
  IterableOperator<T>::every(
    predicate: (element: T, index: number) => unknown
  ): boolean
`, () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'every')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).every(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
