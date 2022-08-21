import * as middleware from '@middleware/transform'
import { transform } from '@style/pipeline/middleware/transform'
import '@blackglory/jest-matchers'

describe(`
  transform<T, U>(
    transformer: (iterable: Iterable<T>) => Iterable<U>
  ): (iterable: Iterable<T>) => IterableIterator<U>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'transform')
    const iter = [1, 2, 3]
    const transformer = () => iter

    const result = transform(transformer)(iter)

    expect(spy).toBeCalledWith(iter, transformer)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
