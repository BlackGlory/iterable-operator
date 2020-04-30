export function* countdown(begin: number, end: number): Iterable<number> {
  if (begin < end) return
  for (let i = begin; i >= end; i--) {
    yield i
  }
}
