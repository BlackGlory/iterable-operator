import * as middleware from '@middleware/zip'
import { IterableOperator } from '@style/chaining'
import '@blackglory/jest-matchers'

describe(`IterableOperator<T>::zip<U extends Array<Iterable<unknown>>>(
  ...iterables: U
): IterableOperator<[T, ...ExtractTypeTupleFromIterableTuple<U>]>`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(middleware, 'zip')
    const iter = [1, 2, 3]
    const iterables = [[1, 2, 3]]

    const io = new IterableOperator(iter).zip(...iterables)
    /* @ts-ignore */
    const result = io.subject

    expect(spy).toBeCalledWith(iter, ...iterables)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
