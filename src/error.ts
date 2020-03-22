class NamedError extends Error {
  name = this.constructor.name
}

class NamedRangeError extends RangeError {
  name = this.constructor.name
}

class NamedTypeError extends TypeError {
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

export class InvalidArgumentsLengthError extends NamedTypeError {
  constructor(name: string, minimum: number, got: number) {
    super(`${name} requires at least ${pluralize('argument', minimum)}, but only ${pluralize('was', got)} passed`)
  }
}

function pluralize(word: string, count: number) {
  if (count !== 1) {
    switch (word) {
      case 'was': word = 'were'; break
      default: word = word + 's'
    }
  }
  return `${count} ${word}`
}
