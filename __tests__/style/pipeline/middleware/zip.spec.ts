import * as middleware from '@middleware/zip'
import { zip } from '@style/pipeline/middleware/zip'
import '@blackglory/jest-matchers'

describe(`zip<T, U extends Array<Iterable<unknown>>>(
  ...iterables: U
): (iterable: T) => Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]>`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'zip')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zip(...iterables)(iter)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
