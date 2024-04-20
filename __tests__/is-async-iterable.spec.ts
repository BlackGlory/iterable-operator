import { describe, test, expect } from 'vitest'
import { isAsyncIterable, isntAsyncIterable } from '@src/is-async-iterable.js'
import { toIterable, toAsyncIterable } from '@test/utils.js'

describe('isAsyncIterable', () => {
  test('is AsyncIterable', () => {
    const value = toAsyncIterable([])

    const result = isAsyncIterable(value)

    expect(result).toBe(true)
  })

  test('isnt AsyncIterable', () => {
    const value = toIterable([])

    const result = isAsyncIterable(value)

    expect(result).toBe(false)
  })
})

describe('isntAsyncIterable', () => {
  test('is AsyncIterable', () => {
    const value = toAsyncIterable([])

    const result = isntAsyncIterable(value)

    expect(result).toBe(false)
  })

  test('isnt AsyncIterable', () => {
    const value = toIterable([])

    const result = isntAsyncIterable(value)

    expect(result).toBe(true)
  })
})
