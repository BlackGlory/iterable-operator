import * as output from '@output/some-async'
import { someAsync } from '@style/binding/output/some-async'

describe(`
  someAsync<T>(
    this: Iterable<T> | AsyncIterable<T>
  , predicate: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<boolean>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'someAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = someAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
