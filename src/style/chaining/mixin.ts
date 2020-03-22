export function mixinDecorators<
  T extends new (...args: any[]) => unknown
, U extends T
, V extends T
>(base: U, decorators: V[]) {
  for (const decorator of decorators) {
    for (const name of Object.getOwnPropertyNames(decorator.prototype)) {
      if (name === 'constructor') continue
      const descriptor = Object.getOwnPropertyDescriptor(decorator.prototype, name)
      Object.defineProperty(base.prototype, name, descriptor!)
    }
  }
}
