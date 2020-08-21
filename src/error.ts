class NamedError extends Error {
  name = this.constructor.name
}

class NamedRangeError extends RangeError {
  name = this.constructor.name
}

export class RuntimeError extends NamedError {}

export class InvalidArgumentError extends NamedRangeError {
  constructor(name: string, expected?: string) {
    if (expected) {
      super(`${name} argument must be ${expected}`)
    } else {
      super(`Invalid ${name} value`)
    }
  }
}
