import * as middleware from '@middleware/uniq'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::uniq(): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'uniq')
    const iter = [1, 2, 3]

    const io = new IterableOperator(iter).uniq()
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
