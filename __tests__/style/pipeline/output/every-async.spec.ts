import * as output from '@output/every-async'
import { everyAsync } from '@style/pipeline/output/every-async'

describe(`
  everyAsync<T>(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): (iterable: Iterable<T> | AsyncIterable<T>) => Promise<boolean>
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'everyAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = everyAsync(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
