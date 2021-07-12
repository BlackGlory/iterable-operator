import * as output from '@output/each-async'
import { eachAsync } from '@style/binding/output/each-async'

describe(`
  eachAsync<T>(
    this: Iterable<T> | AsyncIterable<T>
  , fn: (element: T, index: number) => unknown | PromiseLike<unknown>
  ): Promise<void>
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'eachAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = eachAsync.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
