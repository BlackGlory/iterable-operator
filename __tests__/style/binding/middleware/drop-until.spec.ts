import * as middleware from '@middleware/drop-until'
import { dropUntil } from '@style/binding/middleware/drop-until'
import '@test/matchers'

describe('dropUntil<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'dropUntil')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = dropUntil.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
