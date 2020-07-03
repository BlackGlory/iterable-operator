import * as middleware from '@middleware/filter'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IteralbeOperator<T>::filter<U extends T = T>(fn: (element: T, index: number) => boolean): IterableOperator<U>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'filter')
    const iter = [1, 2, 3]
    const fn = () => true

    const io = new IterableOperator(iter).filter(fn)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
