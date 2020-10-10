import * as middleware from '@middleware/split'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::split(separator: T): IterableOperator<T[]>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'split')
    const iter = [1, 2, 3]
    const separator = 1

    const io = new IterableOperator(iter).split(separator)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
