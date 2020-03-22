export async function getPromiseError<T = Error>(promise: PromiseLike<unknown>): Promise<T>
export async function getPromiseError<T = Error>(promise: PromiseLike<unknown>, defaultValue: T): Promise<T>
export async function getPromiseError(promise: PromiseLike<unknown>, defaultValue = null){
  try {
    await promise
  } catch (promiseError) {
    return promiseError
  }
  return defaultValue
}
