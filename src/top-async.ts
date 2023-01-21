import { assert } from '@blackglory/errors'
import { findInsertionIndex } from './utils.js'

export async function topAsync<T>(
  iterable: AsyncIterable<T>
, num: number
, compare: (a: T, b: T) => number
): Promise<T[]> {
  assert(Number.isInteger(num), 'The parameter num must be an integer')
  assert(num > 0, 'The parameter num must be greater than 0')

  const result: T[] = []

  for await (const element of iterable) {
    if (result.length > 0) {
      const insertionIndex = findInsertionIndex(result, element, compare)
      const maxIndex = Math.min(result.length, num - 1)
      if (insertionIndex <= maxIndex) {
        // 将insertionIndex位置及之后的数组元素全部后移一位
        for (let i = maxIndex; i > insertionIndex; i--) {
          result[i] = result[i - 1]
        }
        // 替换insertionIndex位置的元素
        result[insertionIndex] = element
      }
    } else {
      result.push(element)
    }
  }

  return result
}
