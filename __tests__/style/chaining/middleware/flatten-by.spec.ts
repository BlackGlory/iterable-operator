import * as middleware from '@middleware/flatten-by'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe(`
  IterableOperator<T>::flattenBy<T>(
    predicate: (element: unknown, level: number) => unknown
  ): IterableOperator<T>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).flattenBy(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
