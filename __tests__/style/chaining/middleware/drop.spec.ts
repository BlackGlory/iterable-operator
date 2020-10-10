import * as middleware from '@middleware/drop'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperatordrop<T>(count: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'drop')
    const iter = [1, 2, 3]
    const count = 1

    const io = new IterableOperator(iter).drop(count)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
