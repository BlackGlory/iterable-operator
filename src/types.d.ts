type GetTypeOfIterable<T> = T extends Iterable<infer U> ? U : never

type ExtractTypeTupleFromIterableTuple<T> = {
  [K in keyof T]: GetTypeOfIterable<T[K]>
}

type ExtractTypeTupleFromAsyncLikeIterableTuple<T> = {
  [K in keyof T]:
    T[K] extends AsyncIterable<infer U> ? U :
      T[K] extends Iterable<PromiseLike<infer V>> ? V :
        GetTypeOfIterable<T[K]>
}
