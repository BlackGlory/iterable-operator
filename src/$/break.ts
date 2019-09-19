export const BreakFlag = Symbol('break')

export function $break(): never {
  throw BreakFlag
}
