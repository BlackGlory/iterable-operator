import * as middleware from '@middleware/transform'
import { transform } from '@style/binding/middleware/transform'
import '@blackglory/jest-matchers'

describe(`
  transform<T, U>(
    this: Iterable<T>
  , transformer: (iterable: Iterable<T>) => Iterable<U>
  ): IterableIterator<U>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'transform')
    const iter = [1, 2, 3]
    const transformer = () => iter

    const result = transform.call(iter, transformer)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
