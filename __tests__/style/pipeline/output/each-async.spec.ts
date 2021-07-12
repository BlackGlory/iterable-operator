import * as output from '@output/each-async'
import { eachAsync } from '@style/pipeline/output/each-async'

describe(`
  eachAsync<T>(
    fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<void>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'eachAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = eachAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
