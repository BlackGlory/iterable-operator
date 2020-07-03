import * as middleware from '@middleware/tap'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::tap(fn: (element: T, index: number) => unknown): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'tap')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).tap(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
