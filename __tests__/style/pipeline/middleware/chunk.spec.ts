import * as middleware from '@middleware/chunk'
import { chunk } from '@style/pipeline/middleware/chunk'
import '@blackglory/jest-matchers'

describe(`
  chunk<T>(size: number): (iterable: Iterable<T>) => IterableIterator<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'chunk')
    const iter = [1, 2, 3]
    const size = 1

    const result = chunk(size)(iter)

    expect(spy).toBeCalledWith(iter, size)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
