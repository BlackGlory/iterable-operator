import * as middleware from '@middleware/drop-right'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::dropRight(count: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'dropRight')
    const iter = [1, 2, 3]
    const count = 1

    const io = new IterableOperator(iter).dropRight(count)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
