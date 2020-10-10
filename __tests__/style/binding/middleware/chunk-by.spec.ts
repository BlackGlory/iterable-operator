import * as middleware from '@middleware/chunk-by'
import { chunkBy } from '@style/binding/middleware/chunk-by'
import '@blackglory/jest-matchers'

describe('chunkBy<T>(this: Iterable<T>, fn: (element: T, index: number) => boolean): Iterable<T[]>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'chunkBy')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = chunkBy.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
