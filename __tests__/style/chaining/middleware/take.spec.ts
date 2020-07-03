import * as middleware from '@middleware/take'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::take(count: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'take')
    const iter = [1, 2, 3]
    const count = 1

    const io = new IterableOperator(iter).take(count)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
