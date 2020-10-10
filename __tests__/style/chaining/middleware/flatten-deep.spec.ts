import * as middleware from '@middleware/flatten-deep'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe('IterableOperator<T>::flattenDeep<T>(depth: number): IterableOperator<T>', () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeep')
    const iter = [1, 2, 3]
    const depth = 1

    const io = new IterableOperator(iter).flattenDeep(depth)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
