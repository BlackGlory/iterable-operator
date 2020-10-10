import * as middleware from '@middleware/flatten'
import { flatten } from '@style/pipeline/middleware/flatten'
import '@blackglory/jest-matchers'

describe('flatten<T>(): (iterable: Iterable<unknown>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'flatten')
    const iter = [1, 2, 3]

    const result = flatten()(iter)

    expect(spy).toBeCalledWith(iter)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
