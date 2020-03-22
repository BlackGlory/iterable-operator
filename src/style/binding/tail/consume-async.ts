import { applyBinding } from '@style/utils'
import { consumeAsync as target } from '@tail/consume-async'

export function consumeAsync<T, U>(this: AsyncIterable<T>, consumer: (iterable: AsyncIterable<T>) => PromiseLike<U>): Promise<U>
export function consumeAsync(this: any, ...args: unknown[]) {
  return applyBinding(this, target, args)
}
