import * as output from '@output/group-by-async'
import { groupByAsync } from '@style/binding/output/group-by-async'

describe(`
  groupByAsync<T>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<void>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'groupByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = groupByAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
