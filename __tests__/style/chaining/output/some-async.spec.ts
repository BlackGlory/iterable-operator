import * as output from '@output/some-async'
import { IterableOperator } from '@style/chaining'

describe(`
  IterableOperator<T>::someAsync(
    predicate: (element: T, index: number) => Awaitable<unknown>
  ): Promise<boolean>
`, () => {
  it('is chaining style', () => {
    const spy = jest.spyOn(output, 'someAsync')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = new IterableOperator(iter).someAsync(fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
