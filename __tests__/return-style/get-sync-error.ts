import { isPromise } from 'extra-promise'

export function getSyncError<T = Error>(fn: () => unknown): T | null
export function getSyncError<T = Error>(fn: () => unknown, defaultValue: T): T
export function getSyncError(fn: () => unknown, defaultValue = null) {
  let result: unknown
  try {
    result = fn()
  } catch (syncError) {
    return syncError
  } finally {
    if (isPromise(result)) ignoreAsyncError(result)
  }
  return defaultValue
}

function ignoreAsyncError<T>(promise: PromiseLike<T>) {
  Promise.resolve(promise).catch(() => {})
}
