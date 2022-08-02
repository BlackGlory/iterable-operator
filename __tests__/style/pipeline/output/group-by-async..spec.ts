import * as output from '@output/group-by-async'
import { groupByAsync } from '@style/pipeline/output/group-by-async'

describe(`
  groupByAsync<T, U>(
    fn: (element: T, index: number) => Awaitable<U>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<Map<U, T[]>>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'groupByAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = groupByAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
