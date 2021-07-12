import * as middleware from '@middleware/map'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe(`
  IterableOperator<T>::map<U>(
    fn: (element: T, index: number) => U
  ): IterableOperator<U>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'map')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).map(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
