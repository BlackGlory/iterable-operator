// pipe start
export function range(): Iterable<number>
export function range(start: number): Iterable<number>
export function range(start: number, end: number): Iterable<number>
export function range(start: number, end: number, step: number): Iterable<number>
export function range(
  start: number = Number.MIN_SAFE_INTEGER
, end: number = Number.MAX_SAFE_INTEGER + 1
, step: number = 1
): Iterable<number> {
  if (step < 0) throw new RangeError('Invalid step value')
  return (function* () {
    if (start < end) {
      for (let i = start; i < end; i += step) yield i
    } else {
      for (let i = start; i > end; i -= step) yield i
    }
  })()
}
