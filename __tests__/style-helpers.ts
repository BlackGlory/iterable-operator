import { IterableOperator } from '@style/chaining/iterable-operator'
import { AsyncIterableOperator } from '@style/chaining/async-iterable-operator'

type AnyFunction = (...args: any[]) => any

export function pipe(target: AnyFunction) {
  return (iterable: unknown, ...args: unknown[]) => target(...args)(iterable)
}

export function bind(target: AnyFunction) {
  return (iterable: unknown, ...args: unknown[]) => Reflect.apply(target, iterable, args)
}

export function iterableChain(target: AnyFunction) {
  return (iterable: Iterable<unknown>, ...args: unknown[]) => {
    const operator = new IterableOperator(iterable)
    const result = Reflect.apply(target, operator, args)
    expect(result).toBeInstanceOf(IterableOperator)
    return result
  }
}

export function iterableChainAsync(target: AnyFunction) {
  return (iterable: Iterable<unknown>, ...args: unknown[]) => {
    const operator = new IterableOperator(iterable)
    const result = Reflect.apply(target, operator, args)
    expect(result).toBeInstanceOf(AsyncIterableOperator)
    return result
  }
}

export function asyncIterableChain(target: AnyFunction) {
  return (iterable: AsyncIterable<unknown>, ...args: unknown[]) => {
    const operator = new AsyncIterableOperator(iterable)
    const result = Reflect.apply(target, operator, args)
    expect(result).toBeInstanceOf(AsyncIterableOperator)
    return result
  }
}

export function method(target: AnyFunction) {
  return (iterable: Iterable<unknown>, ...args: unknown[]) => {
    const operator = new IterableOperator(iterable)
    return Reflect.apply(target, operator, args)
  }
}

export function asyncMethod(target: AnyFunction) {
  return (iterable: AsyncIterable<unknown>, ...args: unknown[]) => {
    const operator = new AsyncIterableOperator(iterable)
    return Reflect.apply(target, operator, args)
  }
}
