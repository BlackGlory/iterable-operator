import * as middleware from '@middleware/slice'
import { slice } from '@style/pipeline/middleware/slice'
import '@blackglory/jest-matchers'

describe('slice<T>(start: number, end: number): (iterable: Iterable<T>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'slice')
    const iter = [1, 2, 3]
    const start = 1
    const end = 2

    const result = slice(start, end)(iter)

    expect(spy).toBeCalledWith(iter, start, end)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
