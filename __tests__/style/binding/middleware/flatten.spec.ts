import * as middleware from '@middleware/flatten'
import { flatten } from '@style/binding/middleware/flatten'
import '@blackglory/jest-matchers'

describe('flatten<T>(this: Iterable<unknown>): IterableIterator<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flatten')
    const iter = [1, 2, 3]

    const result = flatten.call(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
