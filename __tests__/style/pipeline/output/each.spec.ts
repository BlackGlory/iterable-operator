import * as output from '@output/each'
import { each } from '@style/pipeline/output/each'

describe(`
  each<T>(fn: (element: T, index: number) => unknown): (iterable: Iterable<T>) => void
`, () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(output, 'each')
    const iter = [1, 2, 3]
    const fn = () => true

    const result = each(fn)(iter)

    expect(spy).toBeCalledWith(iter, fn)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
