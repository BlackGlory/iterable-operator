import { mixinDecorators } from './mixin'
import { IterableOperatorBase } from './iterable-operator-base'

import { ChunkByOperator } from './middleware/chunk-by'
import { ChunkOperator } from './middleware/chunk'
import { ConcatOperator } from './middleware/concat'
import { DropRightOperator } from './middleware/drop-right'
import { DropUntilOperator } from './middleware/drop-until'
import { DropOperator } from './middleware/drop'
import { FilterOperator } from './middleware/filter'
import { FlattenByOperator } from './middleware/flatten-by'
import { FlattenDeepOperator } from './middleware/flatten-deep'
import { FlattenOperator } from './middleware/flatten'
import { MapOperator } from './middleware/map'
import { RepeatOperator } from './middleware/repeat'
import { SliceOperator } from './middleware/slice'
import { SplitByOperator } from './middleware/split-by'
import { SplitOperator } from './middleware/split'
import { TakeRightOperator } from './middleware/take-right'
import { TakeUntilOperator } from './middleware/take-until'
import { TakeOperator } from './middleware/take'
import { TapOperator } from './middleware/tap'
import { ToAsyncIterableOperator } from './middleware/to-async-iterable'
import { TransformAsyncOperator } from './middleware/transform-async'
import { TransformOperator } from './middleware/transform'
import { UniqByOperator } from './middleware/uniq-by'
import { UniqOperator } from './middleware/uniq'
import { ZipOperator } from './middleware/zip'

import { ChunkByAsyncOperator } from './middleware/chunk-by-async'
import { ConcatAsyncOperator } from './middleware/concat-async'
import { DropUntilAsyncOperator } from './middleware/drop-until-async'
import { FilterAsyncOperator } from './middleware/filter-async'
import { FlattenByAsync } from './middleware/flatten-by-async'
import { MapAsyncOperator } from './middleware/map-async'
import { SplitByAsyncOperator } from './middleware/split-by-async'
import { TakeUntilAsyncOperator } from './middleware/take-until-async'
import { TapAsyncOperator } from './middleware/tap-async'
import { UniqByAsyncOperator } from './middleware/uniq-by-async'
import { ZipAsyncOperator } from './middleware/zip-async'

import { ConsumeOperator } from './output/consume'
import { EachOperator } from './output/each'
import { EveryOperator } from './output/every'
import { FindOperator } from './output/find'
import { FirstOperator } from './output/first'
import { IncludesOperator } from './output/includes'
import { MatchOperator } from './output/match'
import { ReduceOperator } from './output/reduce'
import { SomeOperator } from './output/some'
import { LastOperator } from './output/last'
import { ToArrayOperator } from './output/to-array'
import { ToSetOperator } from './output/to-set'
import { CountOperator } from './output/count'
import { GroupByOperator } from './output/group-by'

import { EachAsyncOperator } from './output/each-async'
import { EveryAsyncOperator } from './output/every-async'
import { FindAsyncOperator } from './output/find-async'
import { ReduceAsyncOperator } from './output/reduce-async'
import { SomeAsyncOperator } from './output/some-async'
import { GroupByAsyncOperator } from './output/group-by-async'

export class IterableOperator<T> extends IterableOperatorBase<T> {}

export interface IterableOperator<T> extends
  ChunkOperator<T>
, ChunkByOperator<T>
, ConcatOperator<T>
, DropRightOperator<T>
, DropUntilOperator<T>
, DropOperator<T>
, FilterOperator<T>
, FlattenByOperator<T>
, FlattenDeepOperator<T>
, FlattenOperator<T>
, MapOperator<T>
, RepeatOperator<T>
, SliceOperator<T>
, SplitByOperator<T>
, SplitOperator<T>
, TakeRightOperator<T>
, TakeUntilOperator<T>
, TakeOperator<T>
, TapOperator<T>
, TransformOperator<T>
, UniqByOperator<T>
, UniqOperator<T>
, ZipOperator<T>

, ChunkByAsyncOperator<T, Iterable<T>>
, ConcatAsyncOperator<T, Iterable<T>>
, DropUntilAsyncOperator<T, Iterable<T>>
, FilterAsyncOperator<T, Iterable<T>>
, FlattenByAsync<T, Iterable<T>>
, MapAsyncOperator<T, Iterable<T>>
, SplitByAsyncOperator<T, Iterable<T>>
, TakeUntilAsyncOperator<T, Iterable<T>>
, TapAsyncOperator<T, Iterable<T>>
, ToAsyncIterableOperator<T>
, TransformAsyncOperator<T, Iterable<T>>
, UniqByAsyncOperator<T, Iterable<T>>
, ZipAsyncOperator<T, Iterable<T>>

, ConsumeOperator<T, Iterable<T>>
, EachOperator<T>
, EveryOperator<T>
, FindOperator<T>
, FirstOperator<T>
, IncludesOperator<T>
, MatchOperator<T>
, ReduceOperator<T>
, SomeOperator<T>
, LastOperator<T>
, ToArrayOperator<T>
, ToSetOperator<T>
, CountOperator<T>
, GroupByOperator<T>

, EachAsyncOperator<T, Iterable<T>>
, EveryAsyncOperator<T, Iterable<T>>
, FindAsyncOperator<T, Iterable<T>>
, ReduceAsyncOperator<T, Iterable<T>>
, SomeAsyncOperator<T, Iterable<T>>
, GroupByAsyncOperator<T, Iterable<T>>
{}

mixinDecorators(IterableOperator, [
  ChunkOperator
, ChunkByOperator
, ConcatOperator
, DropRightOperator
, DropUntilOperator
, DropOperator
, FilterOperator
, FlattenByOperator
, FlattenDeepOperator
, FlattenOperator
, MapOperator
, RepeatOperator
, SliceOperator
, SplitByOperator
, SplitOperator
, TakeRightOperator
, TakeUntilOperator
, TakeOperator
, TapOperator
, TransformOperator
, UniqByOperator
, UniqOperator
, ZipOperator

, ChunkByAsyncOperator
, ConcatAsyncOperator
, DropUntilAsyncOperator
, FilterAsyncOperator
, FlattenByAsync
, MapAsyncOperator
, SplitByAsyncOperator
, TakeUntilAsyncOperator
, TapAsyncOperator
, ToAsyncIterableOperator
, TransformAsyncOperator
, UniqByAsyncOperator
, ZipAsyncOperator

, ConsumeOperator
, EachOperator
, EveryOperator
, FindOperator
, FirstOperator
, IncludesOperator
, MatchOperator
, ReduceOperator
, SomeOperator
, LastOperator
, ToArrayOperator
, ToSetOperator
, CountOperator
, GroupByOperator

, EachAsyncOperator
, EveryAsyncOperator
, FindAsyncOperator
, ReduceAsyncOperator
, SomeAsyncOperator
, GroupByAsyncOperator
])
