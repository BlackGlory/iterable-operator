import * as middleware from '@middleware/split'
import { split } from '@style/pipeline/middleware/split'
import '@blackglory/jest-matchers'

describe(`
  split<T>(separator: T): (iterable: Iterable<T>) => IterableIterator<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'split')
    const iter = [1, 2, 3]
    const separator = 1

    const result = split(separator)(iter)

    expect(spy).toBeCalledWith(iter, separator)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
