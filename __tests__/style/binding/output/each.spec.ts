import * as output from '@output/each'
import { each } from '@style/binding/output/each'

describe(`
  each<T>(this: Iterable<T>, fn: (element: T, index: number) => unknown): void
`, () => {
  it('is binding style', () => {
    const spy = jest.spyOn(output, 'each')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = each.call(iter, fn)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
