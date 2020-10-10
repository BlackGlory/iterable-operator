import * as middleware from '@middleware/take-right'
import { takeRight } from '@style/pipeline/middleware/take-right'
import '@blackglory/jest-matchers'

describe('takeRight<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'takeRight')
    const iter = [1, 2, 3]
    const count = 1

    const result = takeRight(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
