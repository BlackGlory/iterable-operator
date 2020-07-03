import * as middleware from '@middleware/slice'
import { slice } from '@style/binding/middleware/slice'
import '@test/matchers'

describe('slice<T>(this: Iterable<T>, start: number, end: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'slice')
    const iter = [1, 2, 3]
    const start = 1
    const end = 2

    const result = slice.call(iter, start, end)

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
