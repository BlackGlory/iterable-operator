function* rangeUnsignedStep(start: number, end: number, step: number): Iterable<number> {
  if (start < end) {
    for (let i = start; i < end; i += step) yield i
  } else {
    for (let i = start; i > end; i -= step) yield i
  }
}

export function range(end: number): Iterable<number>
export function range(start: number, end: number): Iterable<number>
export function range(start: number, end: number, unsignedStep: number): Iterable<number>
export function range(startOrEnd: number, end?: number, step: number = 1) {
  if (arguments.length === 1) {
    const end = startOrEnd
    return rangeUnsignedStep(0, end, 1)
  }
  if (step < 0) throw new RangeError('Invalid step value')
  const start = startOrEnd
  return rangeUnsignedStep(start, end!, step)
}
