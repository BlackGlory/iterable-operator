import * as middleware from '@middleware/take-until'
import { IterableOperator } from '@style/chaining'

describe('IterableOperator<T>::takeUntil(predicate: (element: T, index: number) => unknown): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'takeUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).takeUntil(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
