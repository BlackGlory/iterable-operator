export const ContinueFlag = Symbol('continue')

export function $continue(): never {
  throw ContinueFlag
}
