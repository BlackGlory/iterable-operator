import { isPromise } from 'extra-promise'

export async function getAsyncError<T = Error>(fn: () => unknown): Promise<T | null>
export async function getAsyncError<T = Error>(fn: () => unknown, defaultValue: T): Promise<T>
export async function getAsyncError(fn: () => unknown, defaultValue = null) {
  let result: unknown
  try {
    result = fn()
  } catch (syncError) {
    return defaultValue
  }
  if (isPromise(result)) {
    try {
      await result
    } catch (asyncError) {
      return asyncError
    }
  }
  return defaultValue
}
