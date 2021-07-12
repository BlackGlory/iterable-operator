import * as middleware from '@middleware/chunk-by'
import { chunkBy } from '@style/pipeline/middleware/chunk-by'
import '@blackglory/jest-matchers'

describe(`
  chunkBy<T>(
    predicate: (element: T, index: number) => unknown
  ): (iterable: Iterable<T>) => Iterable<T[]>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'chunkBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = chunkBy(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
