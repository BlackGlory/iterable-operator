import { InvalidArgumentError } from '@error'
export { InvalidArgumentError }

export function range(start: number, end: number, step: number = 1): Iterable<number> {
  if (step <= 0) throw new InvalidArgumentError('step', '> 0')

  return rangeByUnsignedStep(start, end, step)
}

function* rangeByUnsignedStep(start: number, end: number, step: number): Iterable<number> {
  if (start < end) {
    for (let i = start; i < end; i += step) {
      yield i
    }
  } else {
    for (let i = start; i > end; i -= step) {
      yield i
    }
  }
}
