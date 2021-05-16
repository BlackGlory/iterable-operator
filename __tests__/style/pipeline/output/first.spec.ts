import * as output from '@output/first'
import { first } from '@style/pipeline/output/first'

describe('first<T>(): (iterable: Iterable<T>) => T | undefined', () => {
  it('is biding style', () => {
    const spy = jest.spyOn(output, 'first')
    const iter = [1, 2, 3]

    const result = first()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
