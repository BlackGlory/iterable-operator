import * as middleware from '@middleware/chunk'
import { chunk } from '@style/pipeline/middleware/chunk'
import '@test/matchers'

describe('chunk<T>(size: number): (iterable: Iterable<T>) => Iterable<T[]>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'chunk')
    const iter = [1, 2, 3]
    const size = 1

    const result = chunk(size)(iter)

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
