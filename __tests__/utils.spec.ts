import { findInsertionIndex, getIntermediateIndex } from '@src/utils'
import { compareNumbersAscending, compareNumbersDescending } from 'extra-sort'

describe('findInsertionIndex', () => {
  test('empty array', () => {
    const arr: number[] = []
    const insertionElement = 1

    const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

    expect(result).toBe(0)
  })

  describe('single element array', () => {
    test('new element < old element', () => {
      const arr: number[] = [1]
      const insertionElement = 0.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(0)
    })

    test('new element > old element', () => {
      const arr: number[] = [1]
      const insertionElement = 1.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(1)
    })

    test('new element = old element', () => {
      const arr: number[] = [1]
      const insertionElement = 1

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(1)
    })
  })

  describe('multiple elments array', () => {
    test('[new, old, old]', () => {
      const arr: number[] = [1, 2]
      const insertionElement = 0.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(0)
    })

    test('[old, old, new]', () => {
      const arr: number[] = [0, 1]
      const insertionElement = 1.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(2)
    })

    test('[old, new, old]', () => {
      const arr: number[] = [0, 1]
      const insertionElement = 0.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(1)
    })
  })

  describe('compare', () => {
    test('asc', () => {
      const arr = [0, 1, 2]
      const insertionElement = 0.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersAscending)

      expect(result).toBe(1)
    })

    test('desc', () => {
      const arr = [2, 1, 0]
      const insertionElement = 0.5

      const result = findInsertionIndex(arr, insertionElement, compareNumbersDescending)

      expect(result).toBe(2)
    })
  })
})

describe('getIntermediateIndex', () => {
  test('startIndex = endIndex', () => {
    const startIndex = 1
    const endIndex = 1

    const result = getIntermediateIndex(startIndex, endIndex)

    expect(result).toBe(1)
  })

  test('startIndex != endIndex', () => {
    const startIndex = 1
    const endIndex = 3

    const result = getIntermediateIndex(startIndex, endIndex)

    expect(result).toBe(2)
  })
})
