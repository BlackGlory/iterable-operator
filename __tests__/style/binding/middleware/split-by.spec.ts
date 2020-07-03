import * as middleware from '@middleware/split-by'
import { splitBy } from '@style/binding/middleware/split-by'

describe('splitBy<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'splitBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = splitBy.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
