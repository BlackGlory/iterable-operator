import * as middleware from '@middleware/drop-until'
import { dropUntil } from '@style/binding/middleware/drop-until'
import '@blackglory/jest-matchers'

describe('dropUntil<T>(this: Iterable<T>, predicate: (element: T, index: number) => unknown): Iterable<T>', () => {
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
