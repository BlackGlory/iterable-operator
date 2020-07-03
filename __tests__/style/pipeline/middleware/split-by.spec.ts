import * as middleware from '@middleware/split-by'
import { splitBy } from '@style/pipeline/middleware/split-by'

describe('splitBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'splitBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = splitBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
