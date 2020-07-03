import * as middleware from '@middleware/chunk-by'
import { chunkBy } from '@style/pipeline/middleware/chunk-by'
import '@test/matchers'

describe('chunkBy<T>(fn: (element: T, index: number) => boolean): (iterable: Iterable<T>) => Iterable<T[]>', () => {
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
