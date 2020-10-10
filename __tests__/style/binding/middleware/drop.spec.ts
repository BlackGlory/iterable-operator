import * as middleware from '@middleware/drop'
import { drop } from '@style/binding/middleware/drop'
import '@blackglory/jest-matchers'

describe('drop<T>(this: Iterable<T>, count: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'drop')
    const iter = [1, 2, 3]
    const count = 1

    const result = drop.call(iter, count)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
