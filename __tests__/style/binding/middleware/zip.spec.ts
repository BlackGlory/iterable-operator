import * as middleware from '@middleware/zip'
import { zip } from '@style/binding/middleware/zip'
import '@test/matchers'

describe(`zip<T, U extends Array<Iterable<unknown>>>(
  this: Iterable<T>
, ...iterables: U
): Iterable<[T, ...ExtractTypeTupleFromIterableTuple<U>]>`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'zip')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const result = zip.call(iter, ...iterables)

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
