export function avg(iterable: Iterable<number>): number {
  let count = 0
  let sum = 0
  for (const element of iterable) {
    sum += element
    count++
  }
  return sum / count
}
