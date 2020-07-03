import * as middleware from '@middleware/drop-right'
import { dropRight } from '@style/pipeline/middleware/drop-right'
import '@test/matchers'

describe('dropRight<T>(count: number): (iterable: T) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'dropRight')
    const iter = [1, 2, 3]
    const count = 1

    const result = dropRight(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
