import * as middleware from '@middleware/drop-until'
import { dropUntil } from '@style/pipeline/middleware/drop-until'
import '@test/matchers'

describe('dropUntil<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'dropUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = dropUntil(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
