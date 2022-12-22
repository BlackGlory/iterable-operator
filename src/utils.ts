export type GetTypeOfIterable<T> = T extends Iterable<infer U> ? U : never

export async function* copyAsyncIterable<T>(iterable: AsyncIterable<T>) {
  for await (const element of iterable) {
    yield element
  }
}

export function* copyIterable<T>(iterable: Iterable<T>) {
  for (const element of iterable) {
    yield element
  }
}

export function findInsertionIndex<T>(
  sortedArray: readonly T[]
, insertionElement: T
, compare: (a: T, b: T) => number
): number {
  if (sortedArray.length === 0) {
    return 0
  } else {
    let startIndex = 0
    let endIndex = sortedArray.length - 1

    while (true) {
      const intermediateIndex = getIntermediateIndex(startIndex, endIndex)
      const result = compare(insertionElement, sortedArray[intermediateIndex])
      if (result > 0) {
        // insertionElement应该在中间项的后面

        startIndex = intermediateIndex + 1
        if (startIndex > endIndex) {
          return startIndex
        }
      } else if (result < 0) {
        // insertionElement应该在中间项的前面

        endIndex = intermediateIndex
        if (endIndex === startIndex) {
          return endIndex
        }
      } else {
        // 如果insertionElement与中间项相同, 则向后查找第一个不同项.
        // 该策略使得原先在数组中的相等元素不会被后来的插入元素替代, 这种顺序保证在一些场景下很有用.
        for (let i = intermediateIndex; i < sortedArray.length; i++) {
          if (compare(insertionElement, sortedArray[intermediateIndex]) !== 0) {
            return i
          }
        }
        // 如果没有找到, 意味着该项应该在数组末尾插入.
        return sortedArray.length
      }
    }
  }
}

export function getIntermediateIndex(startIndex: number, endIndex: number): number {
  return startIndex + Math.floor((endIndex - startIndex) / 2)
}
