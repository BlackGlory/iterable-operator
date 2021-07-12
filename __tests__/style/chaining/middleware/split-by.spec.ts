import * as middleware from '@middleware/split-by'
import { IterableOperator } from '@style/chaining'

describe(`
  IterableOperator<T>::splitBy(
    predicate: (element: T, index: number) => unknown
  ): IterableOperator<T[]>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'splitBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).splitBy(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
