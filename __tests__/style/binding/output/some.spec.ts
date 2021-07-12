import * as output from '@output/some'
import { some } from '@style/binding/output/some'

describe(`
  some<T>(
    this: Iterable<T>
  , predicate: (element: T, index: number) => unknown
  ): boolean
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'some')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = some.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
