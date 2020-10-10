import * as middleware from '@middleware/flatten-deep'
import { flattenDeep } from '@style/pipeline/middleware/flatten-deep'
import '@blackglory/jest-matchers'

describe('flattenDeep<T>(depth: number): (iterable: Iterable<unknown>) => Iterable<T>', () => {
  it('is pipeline style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeep')
    const iter = [1, 2, 3]
    const depth = 1

    const result = flattenDeep(depth)(iter)

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
