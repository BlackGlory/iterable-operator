import * as middleware from '@middleware/uniq-by'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe(`
  IterableOperator<T>::uniqBy<U>(
    fn: (element: T, index: number) => U
  ): IterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'uniqBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).uniqBy(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
