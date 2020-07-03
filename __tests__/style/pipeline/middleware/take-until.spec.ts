import * as middleware from '@middleware/take-until'
import { takeUntil } from '@style/pipeline/middleware/take-until'

describe('takeUntil<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'takeUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = takeUntil(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
