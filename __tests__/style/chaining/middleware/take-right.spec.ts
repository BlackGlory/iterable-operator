import * as middleware from '@middleware/take-right'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::takeRight(count: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'takeRight')
    const iter = [1, 2, 3]
    const count = 1

    const io = new IterableOperator(iter).takeRight(count)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
