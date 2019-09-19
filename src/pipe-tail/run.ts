// pipe end
export function run(...iterables: Iterable<unknown>[]): void {
  iterables.forEach(iterable => {
    const iterator = iterable[Symbol.iterator]()
    while (!iterator.next().done) {}
  })
}
