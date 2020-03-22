import { getPipelineProxy } from '@style/utils'
import { consumeAsync as target } from '@tail/consume-async'

export function consumeAsync<T, U>(consumer: (iterable: AsyncIterable<T>) => PromiseLike<U>): (iterable: AsyncIterable<T>) => Promise<U>
export function consumeAsync(...args: unknown[]) {
  return getPipelineProxy(target, args)
}
