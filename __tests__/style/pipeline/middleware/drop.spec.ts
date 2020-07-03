import * as middleware from '@middleware/drop'
import { drop } from '@style/pipeline/middleware/drop'
import '@test/matchers'

describe('drop<T>(count: number): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'drop')
    const iter = [1, 2, 3]
    const count = 1

    const result = drop(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
