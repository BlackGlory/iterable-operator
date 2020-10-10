import * as middleware from '@middleware/chunk'
import { chunk } from '@style/binding/middleware/chunk'
import '@blackglory/jest-matchers'

describe('chunk<T>(this: Iterable<T>, size: number): Iterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'chunk')
    const iter = [1, 2, 3]
    const size = 1

    const result = chunk.call(iter, size)

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
