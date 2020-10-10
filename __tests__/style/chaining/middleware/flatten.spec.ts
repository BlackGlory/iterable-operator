import * as middleware from '@middleware/flatten'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::flatten<T>(): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flatten')
    const iter = [1, 2, 3]

    const io = new IterableOperator(iter).flatten()
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
