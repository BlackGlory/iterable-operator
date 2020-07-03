import * as middleware from '@middleware/zip'
import { zip } from '@style/pipeline/middleware/zip'
import '@test/matchers'

describe('zip<T>(...iterables: Iterable<unknown>[]): (iterable: Iterable<unknown>) => Iterable<T[]>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'zip')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zip(...iterables)(iter)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
