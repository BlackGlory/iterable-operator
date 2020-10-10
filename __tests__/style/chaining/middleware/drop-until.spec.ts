import * as middleware from '@middleware/drop-until'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::dropUntil(fn: (element: T, index: number) => boolean): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'dropUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).dropUntil(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
