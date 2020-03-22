import { IterableOperator } from './chaining/iterable-operator'
import { AsyncIterableOperator } from './chaining/async-iterable-operator'

type AnyFn = (...args: any[]) => any

export function getPipelineProxy(fn: AnyFn, args: unknown[]) {
  return (iterable: unknown) => fn(iterable, ...args)
}

export function applyBinding(iterable: unknown, fn: AnyFn, args: unknown[]) {
  return fn(iterable, ...args)
}

export function applyChaining<T>(iterable: unknown, fn: AnyFn, args: unknown[]) {
  return new IterableOperator<T>(fn(iterable, ...args))
}

export function applyChainingAsync<T>(iterable: unknown, fn: AnyFn, args: unknown[]) {
  return new AsyncIterableOperator<T>(fn(iterable, ...args))
}
