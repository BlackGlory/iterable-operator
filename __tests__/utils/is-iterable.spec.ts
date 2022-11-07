import { isIterable, isntIterable } from '@utils/is-iterable'
import { toIterable, toAsyncIterable } from '@test/utils'

describe('isIterable', () => {
  test('is Iterable', () => {
    const value = toIterable([])

    const result = isIterable(value)

    expect(result).toBe(true)
  })

  test('isnt Iterable', () => {
    const value = toAsyncIterable([])

    const result = isIterable(value)

    expect(result).toBe(false)
  })
})

describe('isntIterable', () => {
  test('is Iterable', () => {
    const value = toIterable([])

    const result = isntIterable(value)

    expect(result).toBe(false)
  })

  test('isnt Iterable', () => {
    const value = toAsyncIterable([])

    const result = isntIterable(value)

    expect(result).toBe(true)
  })
})
