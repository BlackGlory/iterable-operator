import * as middleware from '@middleware/slice'
import { IterableOperator } from '@style/chaining'
import '@test/matchers'

describe('IterableOperator<T>::slice(start: number, end: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'slice')
    const iter = [1, 2, 3]
    const start = 1
    const end = 2

    const io = new IterableOperator(iter).slice(start, end)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
