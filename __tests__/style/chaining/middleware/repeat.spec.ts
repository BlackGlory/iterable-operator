import * as middleware from '@middleware/repeat'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::repeat(times: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'repeat')
    const iter = [1, 2, 3]
    const times = 1

    const io = new IterableOperator(iter).repeat(times)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, times)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
