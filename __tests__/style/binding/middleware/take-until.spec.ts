import * as middleware from '@middleware/take-until'
import { takeUntil } from '@style/binding/middleware/take-until'

describe(`
  takeUntil<T>(
    this: Iterable<T>
  , fn: (element: T, index: number) => unknown
  ): IterableIterator<T>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'takeUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = takeUntil.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
