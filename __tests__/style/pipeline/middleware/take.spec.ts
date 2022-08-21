import * as middleware from '@middleware/take'
import { take } from '@style/pipeline/middleware/take'
import '@blackglory/jest-matchers'

describe(`
  take<T>(count: number): (iterable: Iterable<T>) => IterableIterator<T>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'take')
    const iter = [1, 2, 3]
    const count = 1

    const result = take(count)(iter)

    expect(spy).toBeCalledWith(iter, count)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
