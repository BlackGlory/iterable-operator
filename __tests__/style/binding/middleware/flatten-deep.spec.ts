import * as middleware from '@middleware/flatten-deep'
import { flattenDeep } from '@style/binding/middleware/flatten-deep'
import '@blackglory/jest-matchers'

describe('flattenDeep<T>(this: Iterable<unknown>, depth: number): Iterable<T>', () => {
  it('is binding style', () => {
    const spy = jest.spyOn(middleware, 'flattenDeep')
    const iter = [1, 2, 3]
    const depth = 1

    const result = flattenDeep.call(iter, depth)

    expect(spy).toBeCalledWith(iter, depth)
    expect(spy).toReturnWith(result)
    spy.mockRestore()
  })
})
