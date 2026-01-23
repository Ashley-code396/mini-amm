
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model poolEvent
 * Tracks Sui events emitted by mini_amm modules
 */
export type poolEvent = $Result.DefaultSelection<Prisma.$poolEventPayload>
/**
 * Model pool
 * Stores pool state derived from events
 */
export type pool = $Result.DefaultSelection<Prisma.$poolPayload>
/**
 * Model eventCursor
 * Stores last processed cursor for each event type
 */
export type eventCursor = $Result.DefaultSelection<Prisma.$eventCursorPayload>
/**
 * Model userTransaction
 * Unified transaction tracking for all user activities
 */
export type userTransaction = $Result.DefaultSelection<Prisma.$userTransactionPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more PoolEvents
 * const poolEvents = await prisma.poolEvent.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more PoolEvents
   * const poolEvents = await prisma.poolEvent.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.poolEvent`: Exposes CRUD operations for the **poolEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PoolEvents
    * const poolEvents = await prisma.poolEvent.findMany()
    * ```
    */
  get poolEvent(): Prisma.poolEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pool`: Exposes CRUD operations for the **pool** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pools
    * const pools = await prisma.pool.findMany()
    * ```
    */
  get pool(): Prisma.poolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.eventCursor`: Exposes CRUD operations for the **eventCursor** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more EventCursors
    * const eventCursors = await prisma.eventCursor.findMany()
    * ```
    */
  get eventCursor(): Prisma.eventCursorDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userTransaction`: Exposes CRUD operations for the **userTransaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserTransactions
    * const userTransactions = await prisma.userTransaction.findMany()
    * ```
    */
  get userTransaction(): Prisma.userTransactionDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.2.0
   * Query Engine version: 0c8ef2ce45c83248ab3df073180d5eda9e8be7a3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    poolEvent: 'poolEvent',
    pool: 'pool',
    eventCursor: 'eventCursor',
    userTransaction: 'userTransaction'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "poolEvent" | "pool" | "eventCursor" | "userTransaction"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      poolEvent: {
        payload: Prisma.$poolEventPayload<ExtArgs>
        fields: Prisma.poolEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.poolEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.poolEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          findFirst: {
            args: Prisma.poolEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.poolEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          findMany: {
            args: Prisma.poolEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>[]
          }
          create: {
            args: Prisma.poolEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          createMany: {
            args: Prisma.poolEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.poolEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>[]
          }
          delete: {
            args: Prisma.poolEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          update: {
            args: Prisma.poolEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          deleteMany: {
            args: Prisma.poolEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.poolEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.poolEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>[]
          }
          upsert: {
            args: Prisma.poolEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolEventPayload>
          }
          aggregate: {
            args: Prisma.PoolEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoolEvent>
          }
          groupBy: {
            args: Prisma.poolEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.poolEventCountArgs<ExtArgs>
            result: $Utils.Optional<PoolEventCountAggregateOutputType> | number
          }
        }
      }
      pool: {
        payload: Prisma.$poolPayload<ExtArgs>
        fields: Prisma.poolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.poolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.poolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          findFirst: {
            args: Prisma.poolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.poolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          findMany: {
            args: Prisma.poolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>[]
          }
          create: {
            args: Prisma.poolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          createMany: {
            args: Prisma.poolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.poolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>[]
          }
          delete: {
            args: Prisma.poolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          update: {
            args: Prisma.poolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          deleteMany: {
            args: Prisma.poolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.poolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.poolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>[]
          }
          upsert: {
            args: Prisma.poolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$poolPayload>
          }
          aggregate: {
            args: Prisma.PoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePool>
          }
          groupBy: {
            args: Prisma.poolGroupByArgs<ExtArgs>
            result: $Utils.Optional<PoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.poolCountArgs<ExtArgs>
            result: $Utils.Optional<PoolCountAggregateOutputType> | number
          }
        }
      }
      eventCursor: {
        payload: Prisma.$eventCursorPayload<ExtArgs>
        fields: Prisma.eventCursorFieldRefs
        operations: {
          findUnique: {
            args: Prisma.eventCursorFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.eventCursorFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          findFirst: {
            args: Prisma.eventCursorFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.eventCursorFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          findMany: {
            args: Prisma.eventCursorFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>[]
          }
          create: {
            args: Prisma.eventCursorCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          createMany: {
            args: Prisma.eventCursorCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.eventCursorCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>[]
          }
          delete: {
            args: Prisma.eventCursorDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          update: {
            args: Prisma.eventCursorUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          deleteMany: {
            args: Prisma.eventCursorDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.eventCursorUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.eventCursorUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>[]
          }
          upsert: {
            args: Prisma.eventCursorUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$eventCursorPayload>
          }
          aggregate: {
            args: Prisma.EventCursorAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEventCursor>
          }
          groupBy: {
            args: Prisma.eventCursorGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventCursorGroupByOutputType>[]
          }
          count: {
            args: Prisma.eventCursorCountArgs<ExtArgs>
            result: $Utils.Optional<EventCursorCountAggregateOutputType> | number
          }
        }
      }
      userTransaction: {
        payload: Prisma.$userTransactionPayload<ExtArgs>
        fields: Prisma.userTransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userTransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userTransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          findFirst: {
            args: Prisma.userTransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userTransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          findMany: {
            args: Prisma.userTransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>[]
          }
          create: {
            args: Prisma.userTransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          createMany: {
            args: Prisma.userTransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.userTransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>[]
          }
          delete: {
            args: Prisma.userTransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          update: {
            args: Prisma.userTransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          deleteMany: {
            args: Prisma.userTransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userTransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.userTransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>[]
          }
          upsert: {
            args: Prisma.userTransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userTransactionPayload>
          }
          aggregate: {
            args: Prisma.UserTransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserTransaction>
          }
          groupBy: {
            args: Prisma.userTransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserTransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.userTransactionCountArgs<ExtArgs>
            result: $Utils.Optional<UserTransactionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    poolEvent?: poolEventOmit
    pool?: poolOmit
    eventCursor?: eventCursorOmit
    userTransaction?: userTransactionOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model poolEvent
   */

  export type AggregatePoolEvent = {
    _count: PoolEventCountAggregateOutputType | null
    _avg: PoolEventAvgAggregateOutputType | null
    _sum: PoolEventSumAggregateOutputType | null
    _min: PoolEventMinAggregateOutputType | null
    _max: PoolEventMaxAggregateOutputType | null
  }

  export type PoolEventAvgAggregateOutputType = {
    id: number | null
    timestamp: number | null
  }

  export type PoolEventSumAggregateOutputType = {
    id: number | null
    timestamp: bigint | null
  }

  export type PoolEventMinAggregateOutputType = {
    id: number | null
    digest: string | null
    type: string | null
    sender: string | null
    timestamp: bigint | null
    processed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolEventMaxAggregateOutputType = {
    id: number | null
    digest: string | null
    type: string | null
    sender: string | null
    timestamp: bigint | null
    processed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolEventCountAggregateOutputType = {
    id: number
    digest: number
    type: number
    sender: number
    payload: number
    timestamp: number
    processed: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PoolEventAvgAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type PoolEventSumAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type PoolEventMinAggregateInputType = {
    id?: true
    digest?: true
    type?: true
    sender?: true
    timestamp?: true
    processed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolEventMaxAggregateInputType = {
    id?: true
    digest?: true
    type?: true
    sender?: true
    timestamp?: true
    processed?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolEventCountAggregateInputType = {
    id?: true
    digest?: true
    type?: true
    sender?: true
    payload?: true
    timestamp?: true
    processed?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoolEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which poolEvent to aggregate.
     */
    where?: poolEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poolEvents to fetch.
     */
    orderBy?: poolEventOrderByWithRelationInput | poolEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: poolEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poolEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poolEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned poolEvents
    **/
    _count?: true | PoolEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolEventMaxAggregateInputType
  }

  export type GetPoolEventAggregateType<T extends PoolEventAggregateArgs> = {
        [P in keyof T & keyof AggregatePoolEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoolEvent[P]>
      : GetScalarType<T[P], AggregatePoolEvent[P]>
  }




  export type poolEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: poolEventWhereInput
    orderBy?: poolEventOrderByWithAggregationInput | poolEventOrderByWithAggregationInput[]
    by: PoolEventScalarFieldEnum[] | PoolEventScalarFieldEnum
    having?: poolEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolEventCountAggregateInputType | true
    _avg?: PoolEventAvgAggregateInputType
    _sum?: PoolEventSumAggregateInputType
    _min?: PoolEventMinAggregateInputType
    _max?: PoolEventMaxAggregateInputType
  }

  export type PoolEventGroupByOutputType = {
    id: number
    digest: string
    type: string
    sender: string | null
    payload: JsonValue
    timestamp: bigint
    processed: boolean
    createdAt: Date
    updatedAt: Date
    _count: PoolEventCountAggregateOutputType | null
    _avg: PoolEventAvgAggregateOutputType | null
    _sum: PoolEventSumAggregateOutputType | null
    _min: PoolEventMinAggregateOutputType | null
    _max: PoolEventMaxAggregateOutputType | null
  }

  type GetPoolEventGroupByPayload<T extends poolEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolEventGroupByOutputType[P]>
            : GetScalarType<T[P], PoolEventGroupByOutputType[P]>
        }
      >
    >


  export type poolEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    digest?: boolean
    type?: boolean
    sender?: boolean
    payload?: boolean
    timestamp?: boolean
    processed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["poolEvent"]>

  export type poolEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    digest?: boolean
    type?: boolean
    sender?: boolean
    payload?: boolean
    timestamp?: boolean
    processed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["poolEvent"]>

  export type poolEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    digest?: boolean
    type?: boolean
    sender?: boolean
    payload?: boolean
    timestamp?: boolean
    processed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["poolEvent"]>

  export type poolEventSelectScalar = {
    id?: boolean
    digest?: boolean
    type?: boolean
    sender?: boolean
    payload?: boolean
    timestamp?: boolean
    processed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type poolEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "digest" | "type" | "sender" | "payload" | "timestamp" | "processed" | "createdAt" | "updatedAt", ExtArgs["result"]["poolEvent"]>

  export type $poolEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "poolEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      digest: string
      type: string
      sender: string | null
      payload: Prisma.JsonValue
      timestamp: bigint
      processed: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["poolEvent"]>
    composites: {}
  }

  type poolEventGetPayload<S extends boolean | null | undefined | poolEventDefaultArgs> = $Result.GetResult<Prisma.$poolEventPayload, S>

  type poolEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<poolEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolEventCountAggregateInputType | true
    }

  export interface poolEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['poolEvent'], meta: { name: 'poolEvent' } }
    /**
     * Find zero or one PoolEvent that matches the filter.
     * @param {poolEventFindUniqueArgs} args - Arguments to find a PoolEvent
     * @example
     * // Get one PoolEvent
     * const poolEvent = await prisma.poolEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends poolEventFindUniqueArgs>(args: SelectSubset<T, poolEventFindUniqueArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PoolEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {poolEventFindUniqueOrThrowArgs} args - Arguments to find a PoolEvent
     * @example
     * // Get one PoolEvent
     * const poolEvent = await prisma.poolEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends poolEventFindUniqueOrThrowArgs>(args: SelectSubset<T, poolEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventFindFirstArgs} args - Arguments to find a PoolEvent
     * @example
     * // Get one PoolEvent
     * const poolEvent = await prisma.poolEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends poolEventFindFirstArgs>(args?: SelectSubset<T, poolEventFindFirstArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PoolEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventFindFirstOrThrowArgs} args - Arguments to find a PoolEvent
     * @example
     * // Get one PoolEvent
     * const poolEvent = await prisma.poolEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends poolEventFindFirstOrThrowArgs>(args?: SelectSubset<T, poolEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PoolEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PoolEvents
     * const poolEvents = await prisma.poolEvent.findMany()
     * 
     * // Get first 10 PoolEvents
     * const poolEvents = await prisma.poolEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poolEventWithIdOnly = await prisma.poolEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends poolEventFindManyArgs>(args?: SelectSubset<T, poolEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PoolEvent.
     * @param {poolEventCreateArgs} args - Arguments to create a PoolEvent.
     * @example
     * // Create one PoolEvent
     * const PoolEvent = await prisma.poolEvent.create({
     *   data: {
     *     // ... data to create a PoolEvent
     *   }
     * })
     * 
     */
    create<T extends poolEventCreateArgs>(args: SelectSubset<T, poolEventCreateArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PoolEvents.
     * @param {poolEventCreateManyArgs} args - Arguments to create many PoolEvents.
     * @example
     * // Create many PoolEvents
     * const poolEvent = await prisma.poolEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends poolEventCreateManyArgs>(args?: SelectSubset<T, poolEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PoolEvents and returns the data saved in the database.
     * @param {poolEventCreateManyAndReturnArgs} args - Arguments to create many PoolEvents.
     * @example
     * // Create many PoolEvents
     * const poolEvent = await prisma.poolEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PoolEvents and only return the `id`
     * const poolEventWithIdOnly = await prisma.poolEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends poolEventCreateManyAndReturnArgs>(args?: SelectSubset<T, poolEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PoolEvent.
     * @param {poolEventDeleteArgs} args - Arguments to delete one PoolEvent.
     * @example
     * // Delete one PoolEvent
     * const PoolEvent = await prisma.poolEvent.delete({
     *   where: {
     *     // ... filter to delete one PoolEvent
     *   }
     * })
     * 
     */
    delete<T extends poolEventDeleteArgs>(args: SelectSubset<T, poolEventDeleteArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PoolEvent.
     * @param {poolEventUpdateArgs} args - Arguments to update one PoolEvent.
     * @example
     * // Update one PoolEvent
     * const poolEvent = await prisma.poolEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends poolEventUpdateArgs>(args: SelectSubset<T, poolEventUpdateArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PoolEvents.
     * @param {poolEventDeleteManyArgs} args - Arguments to filter PoolEvents to delete.
     * @example
     * // Delete a few PoolEvents
     * const { count } = await prisma.poolEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends poolEventDeleteManyArgs>(args?: SelectSubset<T, poolEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PoolEvents
     * const poolEvent = await prisma.poolEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends poolEventUpdateManyArgs>(args: SelectSubset<T, poolEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PoolEvents and returns the data updated in the database.
     * @param {poolEventUpdateManyAndReturnArgs} args - Arguments to update many PoolEvents.
     * @example
     * // Update many PoolEvents
     * const poolEvent = await prisma.poolEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PoolEvents and only return the `id`
     * const poolEventWithIdOnly = await prisma.poolEvent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends poolEventUpdateManyAndReturnArgs>(args: SelectSubset<T, poolEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PoolEvent.
     * @param {poolEventUpsertArgs} args - Arguments to update or create a PoolEvent.
     * @example
     * // Update or create a PoolEvent
     * const poolEvent = await prisma.poolEvent.upsert({
     *   create: {
     *     // ... data to create a PoolEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PoolEvent we want to update
     *   }
     * })
     */
    upsert<T extends poolEventUpsertArgs>(args: SelectSubset<T, poolEventUpsertArgs<ExtArgs>>): Prisma__poolEventClient<$Result.GetResult<Prisma.$poolEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PoolEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventCountArgs} args - Arguments to filter PoolEvents to count.
     * @example
     * // Count the number of PoolEvents
     * const count = await prisma.poolEvent.count({
     *   where: {
     *     // ... the filter for the PoolEvents we want to count
     *   }
     * })
    **/
    count<T extends poolEventCountArgs>(
      args?: Subset<T, poolEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PoolEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoolEventAggregateArgs>(args: Subset<T, PoolEventAggregateArgs>): Prisma.PrismaPromise<GetPoolEventAggregateType<T>>

    /**
     * Group by PoolEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolEventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends poolEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: poolEventGroupByArgs['orderBy'] }
        : { orderBy?: poolEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, poolEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the poolEvent model
   */
  readonly fields: poolEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for poolEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__poolEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the poolEvent model
   */
  interface poolEventFieldRefs {
    readonly id: FieldRef<"poolEvent", 'Int'>
    readonly digest: FieldRef<"poolEvent", 'String'>
    readonly type: FieldRef<"poolEvent", 'String'>
    readonly sender: FieldRef<"poolEvent", 'String'>
    readonly payload: FieldRef<"poolEvent", 'Json'>
    readonly timestamp: FieldRef<"poolEvent", 'BigInt'>
    readonly processed: FieldRef<"poolEvent", 'Boolean'>
    readonly createdAt: FieldRef<"poolEvent", 'DateTime'>
    readonly updatedAt: FieldRef<"poolEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * poolEvent findUnique
   */
  export type poolEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter, which poolEvent to fetch.
     */
    where: poolEventWhereUniqueInput
  }

  /**
   * poolEvent findUniqueOrThrow
   */
  export type poolEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter, which poolEvent to fetch.
     */
    where: poolEventWhereUniqueInput
  }

  /**
   * poolEvent findFirst
   */
  export type poolEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter, which poolEvent to fetch.
     */
    where?: poolEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poolEvents to fetch.
     */
    orderBy?: poolEventOrderByWithRelationInput | poolEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for poolEvents.
     */
    cursor?: poolEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poolEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poolEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of poolEvents.
     */
    distinct?: PoolEventScalarFieldEnum | PoolEventScalarFieldEnum[]
  }

  /**
   * poolEvent findFirstOrThrow
   */
  export type poolEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter, which poolEvent to fetch.
     */
    where?: poolEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poolEvents to fetch.
     */
    orderBy?: poolEventOrderByWithRelationInput | poolEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for poolEvents.
     */
    cursor?: poolEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poolEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poolEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of poolEvents.
     */
    distinct?: PoolEventScalarFieldEnum | PoolEventScalarFieldEnum[]
  }

  /**
   * poolEvent findMany
   */
  export type poolEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter, which poolEvents to fetch.
     */
    where?: poolEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of poolEvents to fetch.
     */
    orderBy?: poolEventOrderByWithRelationInput | poolEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing poolEvents.
     */
    cursor?: poolEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` poolEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` poolEvents.
     */
    skip?: number
    distinct?: PoolEventScalarFieldEnum | PoolEventScalarFieldEnum[]
  }

  /**
   * poolEvent create
   */
  export type poolEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * The data needed to create a poolEvent.
     */
    data: XOR<poolEventCreateInput, poolEventUncheckedCreateInput>
  }

  /**
   * poolEvent createMany
   */
  export type poolEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many poolEvents.
     */
    data: poolEventCreateManyInput | poolEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * poolEvent createManyAndReturn
   */
  export type poolEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * The data used to create many poolEvents.
     */
    data: poolEventCreateManyInput | poolEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * poolEvent update
   */
  export type poolEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * The data needed to update a poolEvent.
     */
    data: XOR<poolEventUpdateInput, poolEventUncheckedUpdateInput>
    /**
     * Choose, which poolEvent to update.
     */
    where: poolEventWhereUniqueInput
  }

  /**
   * poolEvent updateMany
   */
  export type poolEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update poolEvents.
     */
    data: XOR<poolEventUpdateManyMutationInput, poolEventUncheckedUpdateManyInput>
    /**
     * Filter which poolEvents to update
     */
    where?: poolEventWhereInput
    /**
     * Limit how many poolEvents to update.
     */
    limit?: number
  }

  /**
   * poolEvent updateManyAndReturn
   */
  export type poolEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * The data used to update poolEvents.
     */
    data: XOR<poolEventUpdateManyMutationInput, poolEventUncheckedUpdateManyInput>
    /**
     * Filter which poolEvents to update
     */
    where?: poolEventWhereInput
    /**
     * Limit how many poolEvents to update.
     */
    limit?: number
  }

  /**
   * poolEvent upsert
   */
  export type poolEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * The filter to search for the poolEvent to update in case it exists.
     */
    where: poolEventWhereUniqueInput
    /**
     * In case the poolEvent found by the `where` argument doesn't exist, create a new poolEvent with this data.
     */
    create: XOR<poolEventCreateInput, poolEventUncheckedCreateInput>
    /**
     * In case the poolEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<poolEventUpdateInput, poolEventUncheckedUpdateInput>
  }

  /**
   * poolEvent delete
   */
  export type poolEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
    /**
     * Filter which poolEvent to delete.
     */
    where: poolEventWhereUniqueInput
  }

  /**
   * poolEvent deleteMany
   */
  export type poolEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which poolEvents to delete
     */
    where?: poolEventWhereInput
    /**
     * Limit how many poolEvents to delete.
     */
    limit?: number
  }

  /**
   * poolEvent without action
   */
  export type poolEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the poolEvent
     */
    select?: poolEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the poolEvent
     */
    omit?: poolEventOmit<ExtArgs> | null
  }


  /**
   * Model pool
   */

  export type AggregatePool = {
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  export type PoolAvgAggregateOutputType = {
    id: number | null
    reserveA: number | null
    reserveB: number | null
  }

  export type PoolSumAggregateOutputType = {
    id: number | null
    reserveA: bigint | null
    reserveB: bigint | null
  }

  export type PoolMinAggregateOutputType = {
    id: number | null
    poolId: string | null
    token1: string | null
    token2: string | null
    reserveA: bigint | null
    reserveB: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolMaxAggregateOutputType = {
    id: number | null
    poolId: string | null
    token1: string | null
    token2: string | null
    reserveA: bigint | null
    reserveB: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PoolCountAggregateOutputType = {
    id: number
    poolId: number
    token1: number
    token2: number
    reserveA: number
    reserveB: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PoolAvgAggregateInputType = {
    id?: true
    reserveA?: true
    reserveB?: true
  }

  export type PoolSumAggregateInputType = {
    id?: true
    reserveA?: true
    reserveB?: true
  }

  export type PoolMinAggregateInputType = {
    id?: true
    poolId?: true
    token1?: true
    token2?: true
    reserveA?: true
    reserveB?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolMaxAggregateInputType = {
    id?: true
    poolId?: true
    token1?: true
    token2?: true
    reserveA?: true
    reserveB?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PoolCountAggregateInputType = {
    id?: true
    poolId?: true
    token1?: true
    token2?: true
    reserveA?: true
    reserveB?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pool to aggregate.
     */
    where?: poolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pools to fetch.
     */
    orderBy?: poolOrderByWithRelationInput | poolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: poolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pools
    **/
    _count?: true | PoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PoolMaxAggregateInputType
  }

  export type GetPoolAggregateType<T extends PoolAggregateArgs> = {
        [P in keyof T & keyof AggregatePool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePool[P]>
      : GetScalarType<T[P], AggregatePool[P]>
  }




  export type poolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: poolWhereInput
    orderBy?: poolOrderByWithAggregationInput | poolOrderByWithAggregationInput[]
    by: PoolScalarFieldEnum[] | PoolScalarFieldEnum
    having?: poolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PoolCountAggregateInputType | true
    _avg?: PoolAvgAggregateInputType
    _sum?: PoolSumAggregateInputType
    _min?: PoolMinAggregateInputType
    _max?: PoolMaxAggregateInputType
  }

  export type PoolGroupByOutputType = {
    id: number
    poolId: string
    token1: string | null
    token2: string | null
    reserveA: bigint
    reserveB: bigint
    createdAt: Date
    updatedAt: Date
    _count: PoolCountAggregateOutputType | null
    _avg: PoolAvgAggregateOutputType | null
    _sum: PoolSumAggregateOutputType | null
    _min: PoolMinAggregateOutputType | null
    _max: PoolMaxAggregateOutputType | null
  }

  type GetPoolGroupByPayload<T extends poolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PoolGroupByOutputType[P]>
            : GetScalarType<T[P], PoolGroupByOutputType[P]>
        }
      >
    >


  export type poolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    token1?: boolean
    token2?: boolean
    reserveA?: boolean
    reserveB?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pool"]>

  export type poolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    token1?: boolean
    token2?: boolean
    reserveA?: boolean
    reserveB?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pool"]>

  export type poolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    poolId?: boolean
    token1?: boolean
    token2?: boolean
    reserveA?: boolean
    reserveB?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["pool"]>

  export type poolSelectScalar = {
    id?: boolean
    poolId?: boolean
    token1?: boolean
    token2?: boolean
    reserveA?: boolean
    reserveB?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type poolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "poolId" | "token1" | "token2" | "reserveA" | "reserveB" | "createdAt" | "updatedAt", ExtArgs["result"]["pool"]>

  export type $poolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pool"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      poolId: string
      token1: string | null
      token2: string | null
      reserveA: bigint
      reserveB: bigint
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["pool"]>
    composites: {}
  }

  type poolGetPayload<S extends boolean | null | undefined | poolDefaultArgs> = $Result.GetResult<Prisma.$poolPayload, S>

  type poolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<poolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PoolCountAggregateInputType | true
    }

  export interface poolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pool'], meta: { name: 'pool' } }
    /**
     * Find zero or one Pool that matches the filter.
     * @param {poolFindUniqueArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends poolFindUniqueArgs>(args: SelectSubset<T, poolFindUniqueArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pool that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {poolFindUniqueOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends poolFindUniqueOrThrowArgs>(args: SelectSubset<T, poolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolFindFirstArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends poolFindFirstArgs>(args?: SelectSubset<T, poolFindFirstArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pool that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolFindFirstOrThrowArgs} args - Arguments to find a Pool
     * @example
     * // Get one Pool
     * const pool = await prisma.pool.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends poolFindFirstOrThrowArgs>(args?: SelectSubset<T, poolFindFirstOrThrowArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pools
     * const pools = await prisma.pool.findMany()
     * 
     * // Get first 10 Pools
     * const pools = await prisma.pool.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const poolWithIdOnly = await prisma.pool.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends poolFindManyArgs>(args?: SelectSubset<T, poolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pool.
     * @param {poolCreateArgs} args - Arguments to create a Pool.
     * @example
     * // Create one Pool
     * const Pool = await prisma.pool.create({
     *   data: {
     *     // ... data to create a Pool
     *   }
     * })
     * 
     */
    create<T extends poolCreateArgs>(args: SelectSubset<T, poolCreateArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pools.
     * @param {poolCreateManyArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends poolCreateManyArgs>(args?: SelectSubset<T, poolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pools and returns the data saved in the database.
     * @param {poolCreateManyAndReturnArgs} args - Arguments to create many Pools.
     * @example
     * // Create many Pools
     * const pool = await prisma.pool.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pools and only return the `id`
     * const poolWithIdOnly = await prisma.pool.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends poolCreateManyAndReturnArgs>(args?: SelectSubset<T, poolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pool.
     * @param {poolDeleteArgs} args - Arguments to delete one Pool.
     * @example
     * // Delete one Pool
     * const Pool = await prisma.pool.delete({
     *   where: {
     *     // ... filter to delete one Pool
     *   }
     * })
     * 
     */
    delete<T extends poolDeleteArgs>(args: SelectSubset<T, poolDeleteArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pool.
     * @param {poolUpdateArgs} args - Arguments to update one Pool.
     * @example
     * // Update one Pool
     * const pool = await prisma.pool.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends poolUpdateArgs>(args: SelectSubset<T, poolUpdateArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pools.
     * @param {poolDeleteManyArgs} args - Arguments to filter Pools to delete.
     * @example
     * // Delete a few Pools
     * const { count } = await prisma.pool.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends poolDeleteManyArgs>(args?: SelectSubset<T, poolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends poolUpdateManyArgs>(args: SelectSubset<T, poolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pools and returns the data updated in the database.
     * @param {poolUpdateManyAndReturnArgs} args - Arguments to update many Pools.
     * @example
     * // Update many Pools
     * const pool = await prisma.pool.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pools and only return the `id`
     * const poolWithIdOnly = await prisma.pool.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends poolUpdateManyAndReturnArgs>(args: SelectSubset<T, poolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pool.
     * @param {poolUpsertArgs} args - Arguments to update or create a Pool.
     * @example
     * // Update or create a Pool
     * const pool = await prisma.pool.upsert({
     *   create: {
     *     // ... data to create a Pool
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pool we want to update
     *   }
     * })
     */
    upsert<T extends poolUpsertArgs>(args: SelectSubset<T, poolUpsertArgs<ExtArgs>>): Prisma__poolClient<$Result.GetResult<Prisma.$poolPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolCountArgs} args - Arguments to filter Pools to count.
     * @example
     * // Count the number of Pools
     * const count = await prisma.pool.count({
     *   where: {
     *     // ... the filter for the Pools we want to count
     *   }
     * })
    **/
    count<T extends poolCountArgs>(
      args?: Subset<T, poolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PoolAggregateArgs>(args: Subset<T, PoolAggregateArgs>): Prisma.PrismaPromise<GetPoolAggregateType<T>>

    /**
     * Group by Pool.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {poolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends poolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: poolGroupByArgs['orderBy'] }
        : { orderBy?: poolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, poolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pool model
   */
  readonly fields: poolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pool.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__poolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pool model
   */
  interface poolFieldRefs {
    readonly id: FieldRef<"pool", 'Int'>
    readonly poolId: FieldRef<"pool", 'String'>
    readonly token1: FieldRef<"pool", 'String'>
    readonly token2: FieldRef<"pool", 'String'>
    readonly reserveA: FieldRef<"pool", 'BigInt'>
    readonly reserveB: FieldRef<"pool", 'BigInt'>
    readonly createdAt: FieldRef<"pool", 'DateTime'>
    readonly updatedAt: FieldRef<"pool", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * pool findUnique
   */
  export type poolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter, which pool to fetch.
     */
    where: poolWhereUniqueInput
  }

  /**
   * pool findUniqueOrThrow
   */
  export type poolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter, which pool to fetch.
     */
    where: poolWhereUniqueInput
  }

  /**
   * pool findFirst
   */
  export type poolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter, which pool to fetch.
     */
    where?: poolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pools to fetch.
     */
    orderBy?: poolOrderByWithRelationInput | poolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pools.
     */
    cursor?: poolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * pool findFirstOrThrow
   */
  export type poolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter, which pool to fetch.
     */
    where?: poolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pools to fetch.
     */
    orderBy?: poolOrderByWithRelationInput | poolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pools.
     */
    cursor?: poolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pools.
     */
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * pool findMany
   */
  export type poolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter, which pools to fetch.
     */
    where?: poolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pools to fetch.
     */
    orderBy?: poolOrderByWithRelationInput | poolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pools.
     */
    cursor?: poolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pools.
     */
    skip?: number
    distinct?: PoolScalarFieldEnum | PoolScalarFieldEnum[]
  }

  /**
   * pool create
   */
  export type poolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * The data needed to create a pool.
     */
    data: XOR<poolCreateInput, poolUncheckedCreateInput>
  }

  /**
   * pool createMany
   */
  export type poolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pools.
     */
    data: poolCreateManyInput | poolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pool createManyAndReturn
   */
  export type poolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * The data used to create many pools.
     */
    data: poolCreateManyInput | poolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pool update
   */
  export type poolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * The data needed to update a pool.
     */
    data: XOR<poolUpdateInput, poolUncheckedUpdateInput>
    /**
     * Choose, which pool to update.
     */
    where: poolWhereUniqueInput
  }

  /**
   * pool updateMany
   */
  export type poolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pools.
     */
    data: XOR<poolUpdateManyMutationInput, poolUncheckedUpdateManyInput>
    /**
     * Filter which pools to update
     */
    where?: poolWhereInput
    /**
     * Limit how many pools to update.
     */
    limit?: number
  }

  /**
   * pool updateManyAndReturn
   */
  export type poolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * The data used to update pools.
     */
    data: XOR<poolUpdateManyMutationInput, poolUncheckedUpdateManyInput>
    /**
     * Filter which pools to update
     */
    where?: poolWhereInput
    /**
     * Limit how many pools to update.
     */
    limit?: number
  }

  /**
   * pool upsert
   */
  export type poolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * The filter to search for the pool to update in case it exists.
     */
    where: poolWhereUniqueInput
    /**
     * In case the pool found by the `where` argument doesn't exist, create a new pool with this data.
     */
    create: XOR<poolCreateInput, poolUncheckedCreateInput>
    /**
     * In case the pool was found with the provided `where` argument, update it with this data.
     */
    update: XOR<poolUpdateInput, poolUncheckedUpdateInput>
  }

  /**
   * pool delete
   */
  export type poolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
    /**
     * Filter which pool to delete.
     */
    where: poolWhereUniqueInput
  }

  /**
   * pool deleteMany
   */
  export type poolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pools to delete
     */
    where?: poolWhereInput
    /**
     * Limit how many pools to delete.
     */
    limit?: number
  }

  /**
   * pool without action
   */
  export type poolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pool
     */
    select?: poolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pool
     */
    omit?: poolOmit<ExtArgs> | null
  }


  /**
   * Model eventCursor
   */

  export type AggregateEventCursor = {
    _count: EventCursorCountAggregateOutputType | null
    _avg: EventCursorAvgAggregateOutputType | null
    _sum: EventCursorSumAggregateOutputType | null
    _min: EventCursorMinAggregateOutputType | null
    _max: EventCursorMaxAggregateOutputType | null
  }

  export type EventCursorAvgAggregateOutputType = {
    eventSeq: number | null
  }

  export type EventCursorSumAggregateOutputType = {
    eventSeq: number | null
  }

  export type EventCursorMinAggregateOutputType = {
    id: string | null
    txDigest: string | null
    eventSeq: number | null
    updatedAt: Date | null
  }

  export type EventCursorMaxAggregateOutputType = {
    id: string | null
    txDigest: string | null
    eventSeq: number | null
    updatedAt: Date | null
  }

  export type EventCursorCountAggregateOutputType = {
    id: number
    txDigest: number
    eventSeq: number
    updatedAt: number
    _all: number
  }


  export type EventCursorAvgAggregateInputType = {
    eventSeq?: true
  }

  export type EventCursorSumAggregateInputType = {
    eventSeq?: true
  }

  export type EventCursorMinAggregateInputType = {
    id?: true
    txDigest?: true
    eventSeq?: true
    updatedAt?: true
  }

  export type EventCursorMaxAggregateInputType = {
    id?: true
    txDigest?: true
    eventSeq?: true
    updatedAt?: true
  }

  export type EventCursorCountAggregateInputType = {
    id?: true
    txDigest?: true
    eventSeq?: true
    updatedAt?: true
    _all?: true
  }

  export type EventCursorAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which eventCursor to aggregate.
     */
    where?: eventCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventCursors to fetch.
     */
    orderBy?: eventCursorOrderByWithRelationInput | eventCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: eventCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned eventCursors
    **/
    _count?: true | EventCursorCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventCursorAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventCursorSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventCursorMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventCursorMaxAggregateInputType
  }

  export type GetEventCursorAggregateType<T extends EventCursorAggregateArgs> = {
        [P in keyof T & keyof AggregateEventCursor]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEventCursor[P]>
      : GetScalarType<T[P], AggregateEventCursor[P]>
  }




  export type eventCursorGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: eventCursorWhereInput
    orderBy?: eventCursorOrderByWithAggregationInput | eventCursorOrderByWithAggregationInput[]
    by: EventCursorScalarFieldEnum[] | EventCursorScalarFieldEnum
    having?: eventCursorScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCursorCountAggregateInputType | true
    _avg?: EventCursorAvgAggregateInputType
    _sum?: EventCursorSumAggregateInputType
    _min?: EventCursorMinAggregateInputType
    _max?: EventCursorMaxAggregateInputType
  }

  export type EventCursorGroupByOutputType = {
    id: string
    txDigest: string | null
    eventSeq: number | null
    updatedAt: Date
    _count: EventCursorCountAggregateOutputType | null
    _avg: EventCursorAvgAggregateOutputType | null
    _sum: EventCursorSumAggregateOutputType | null
    _min: EventCursorMinAggregateOutputType | null
    _max: EventCursorMaxAggregateOutputType | null
  }

  type GetEventCursorGroupByPayload<T extends eventCursorGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventCursorGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventCursorGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventCursorGroupByOutputType[P]>
            : GetScalarType<T[P], EventCursorGroupByOutputType[P]>
        }
      >
    >


  export type eventCursorSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txDigest?: boolean
    eventSeq?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eventCursor"]>

  export type eventCursorSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txDigest?: boolean
    eventSeq?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eventCursor"]>

  export type eventCursorSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    txDigest?: boolean
    eventSeq?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["eventCursor"]>

  export type eventCursorSelectScalar = {
    id?: boolean
    txDigest?: boolean
    eventSeq?: boolean
    updatedAt?: boolean
  }

  export type eventCursorOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "txDigest" | "eventSeq" | "updatedAt", ExtArgs["result"]["eventCursor"]>

  export type $eventCursorPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "eventCursor"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      txDigest: string | null
      eventSeq: number | null
      updatedAt: Date
    }, ExtArgs["result"]["eventCursor"]>
    composites: {}
  }

  type eventCursorGetPayload<S extends boolean | null | undefined | eventCursorDefaultArgs> = $Result.GetResult<Prisma.$eventCursorPayload, S>

  type eventCursorCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<eventCursorFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCursorCountAggregateInputType | true
    }

  export interface eventCursorDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['eventCursor'], meta: { name: 'eventCursor' } }
    /**
     * Find zero or one EventCursor that matches the filter.
     * @param {eventCursorFindUniqueArgs} args - Arguments to find a EventCursor
     * @example
     * // Get one EventCursor
     * const eventCursor = await prisma.eventCursor.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends eventCursorFindUniqueArgs>(args: SelectSubset<T, eventCursorFindUniqueArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one EventCursor that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {eventCursorFindUniqueOrThrowArgs} args - Arguments to find a EventCursor
     * @example
     * // Get one EventCursor
     * const eventCursor = await prisma.eventCursor.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends eventCursorFindUniqueOrThrowArgs>(args: SelectSubset<T, eventCursorFindUniqueOrThrowArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCursor that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorFindFirstArgs} args - Arguments to find a EventCursor
     * @example
     * // Get one EventCursor
     * const eventCursor = await prisma.eventCursor.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends eventCursorFindFirstArgs>(args?: SelectSubset<T, eventCursorFindFirstArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first EventCursor that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorFindFirstOrThrowArgs} args - Arguments to find a EventCursor
     * @example
     * // Get one EventCursor
     * const eventCursor = await prisma.eventCursor.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends eventCursorFindFirstOrThrowArgs>(args?: SelectSubset<T, eventCursorFindFirstOrThrowArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more EventCursors that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all EventCursors
     * const eventCursors = await prisma.eventCursor.findMany()
     * 
     * // Get first 10 EventCursors
     * const eventCursors = await prisma.eventCursor.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventCursorWithIdOnly = await prisma.eventCursor.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends eventCursorFindManyArgs>(args?: SelectSubset<T, eventCursorFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a EventCursor.
     * @param {eventCursorCreateArgs} args - Arguments to create a EventCursor.
     * @example
     * // Create one EventCursor
     * const EventCursor = await prisma.eventCursor.create({
     *   data: {
     *     // ... data to create a EventCursor
     *   }
     * })
     * 
     */
    create<T extends eventCursorCreateArgs>(args: SelectSubset<T, eventCursorCreateArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many EventCursors.
     * @param {eventCursorCreateManyArgs} args - Arguments to create many EventCursors.
     * @example
     * // Create many EventCursors
     * const eventCursor = await prisma.eventCursor.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends eventCursorCreateManyArgs>(args?: SelectSubset<T, eventCursorCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many EventCursors and returns the data saved in the database.
     * @param {eventCursorCreateManyAndReturnArgs} args - Arguments to create many EventCursors.
     * @example
     * // Create many EventCursors
     * const eventCursor = await prisma.eventCursor.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many EventCursors and only return the `id`
     * const eventCursorWithIdOnly = await prisma.eventCursor.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends eventCursorCreateManyAndReturnArgs>(args?: SelectSubset<T, eventCursorCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a EventCursor.
     * @param {eventCursorDeleteArgs} args - Arguments to delete one EventCursor.
     * @example
     * // Delete one EventCursor
     * const EventCursor = await prisma.eventCursor.delete({
     *   where: {
     *     // ... filter to delete one EventCursor
     *   }
     * })
     * 
     */
    delete<T extends eventCursorDeleteArgs>(args: SelectSubset<T, eventCursorDeleteArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one EventCursor.
     * @param {eventCursorUpdateArgs} args - Arguments to update one EventCursor.
     * @example
     * // Update one EventCursor
     * const eventCursor = await prisma.eventCursor.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends eventCursorUpdateArgs>(args: SelectSubset<T, eventCursorUpdateArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more EventCursors.
     * @param {eventCursorDeleteManyArgs} args - Arguments to filter EventCursors to delete.
     * @example
     * // Delete a few EventCursors
     * const { count } = await prisma.eventCursor.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends eventCursorDeleteManyArgs>(args?: SelectSubset<T, eventCursorDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many EventCursors
     * const eventCursor = await prisma.eventCursor.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends eventCursorUpdateManyArgs>(args: SelectSubset<T, eventCursorUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more EventCursors and returns the data updated in the database.
     * @param {eventCursorUpdateManyAndReturnArgs} args - Arguments to update many EventCursors.
     * @example
     * // Update many EventCursors
     * const eventCursor = await prisma.eventCursor.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more EventCursors and only return the `id`
     * const eventCursorWithIdOnly = await prisma.eventCursor.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends eventCursorUpdateManyAndReturnArgs>(args: SelectSubset<T, eventCursorUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one EventCursor.
     * @param {eventCursorUpsertArgs} args - Arguments to update or create a EventCursor.
     * @example
     * // Update or create a EventCursor
     * const eventCursor = await prisma.eventCursor.upsert({
     *   create: {
     *     // ... data to create a EventCursor
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the EventCursor we want to update
     *   }
     * })
     */
    upsert<T extends eventCursorUpsertArgs>(args: SelectSubset<T, eventCursorUpsertArgs<ExtArgs>>): Prisma__eventCursorClient<$Result.GetResult<Prisma.$eventCursorPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of EventCursors.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorCountArgs} args - Arguments to filter EventCursors to count.
     * @example
     * // Count the number of EventCursors
     * const count = await prisma.eventCursor.count({
     *   where: {
     *     // ... the filter for the EventCursors we want to count
     *   }
     * })
    **/
    count<T extends eventCursorCountArgs>(
      args?: Subset<T, eventCursorCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCursorCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a EventCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCursorAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventCursorAggregateArgs>(args: Subset<T, EventCursorAggregateArgs>): Prisma.PrismaPromise<GetEventCursorAggregateType<T>>

    /**
     * Group by EventCursor.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {eventCursorGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends eventCursorGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: eventCursorGroupByArgs['orderBy'] }
        : { orderBy?: eventCursorGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, eventCursorGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventCursorGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the eventCursor model
   */
  readonly fields: eventCursorFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for eventCursor.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__eventCursorClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the eventCursor model
   */
  interface eventCursorFieldRefs {
    readonly id: FieldRef<"eventCursor", 'String'>
    readonly txDigest: FieldRef<"eventCursor", 'String'>
    readonly eventSeq: FieldRef<"eventCursor", 'Int'>
    readonly updatedAt: FieldRef<"eventCursor", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * eventCursor findUnique
   */
  export type eventCursorFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter, which eventCursor to fetch.
     */
    where: eventCursorWhereUniqueInput
  }

  /**
   * eventCursor findUniqueOrThrow
   */
  export type eventCursorFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter, which eventCursor to fetch.
     */
    where: eventCursorWhereUniqueInput
  }

  /**
   * eventCursor findFirst
   */
  export type eventCursorFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter, which eventCursor to fetch.
     */
    where?: eventCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventCursors to fetch.
     */
    orderBy?: eventCursorOrderByWithRelationInput | eventCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for eventCursors.
     */
    cursor?: eventCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of eventCursors.
     */
    distinct?: EventCursorScalarFieldEnum | EventCursorScalarFieldEnum[]
  }

  /**
   * eventCursor findFirstOrThrow
   */
  export type eventCursorFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter, which eventCursor to fetch.
     */
    where?: eventCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventCursors to fetch.
     */
    orderBy?: eventCursorOrderByWithRelationInput | eventCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for eventCursors.
     */
    cursor?: eventCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventCursors.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of eventCursors.
     */
    distinct?: EventCursorScalarFieldEnum | EventCursorScalarFieldEnum[]
  }

  /**
   * eventCursor findMany
   */
  export type eventCursorFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter, which eventCursors to fetch.
     */
    where?: eventCursorWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of eventCursors to fetch.
     */
    orderBy?: eventCursorOrderByWithRelationInput | eventCursorOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing eventCursors.
     */
    cursor?: eventCursorWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` eventCursors from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` eventCursors.
     */
    skip?: number
    distinct?: EventCursorScalarFieldEnum | EventCursorScalarFieldEnum[]
  }

  /**
   * eventCursor create
   */
  export type eventCursorCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * The data needed to create a eventCursor.
     */
    data: XOR<eventCursorCreateInput, eventCursorUncheckedCreateInput>
  }

  /**
   * eventCursor createMany
   */
  export type eventCursorCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many eventCursors.
     */
    data: eventCursorCreateManyInput | eventCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * eventCursor createManyAndReturn
   */
  export type eventCursorCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * The data used to create many eventCursors.
     */
    data: eventCursorCreateManyInput | eventCursorCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * eventCursor update
   */
  export type eventCursorUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * The data needed to update a eventCursor.
     */
    data: XOR<eventCursorUpdateInput, eventCursorUncheckedUpdateInput>
    /**
     * Choose, which eventCursor to update.
     */
    where: eventCursorWhereUniqueInput
  }

  /**
   * eventCursor updateMany
   */
  export type eventCursorUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update eventCursors.
     */
    data: XOR<eventCursorUpdateManyMutationInput, eventCursorUncheckedUpdateManyInput>
    /**
     * Filter which eventCursors to update
     */
    where?: eventCursorWhereInput
    /**
     * Limit how many eventCursors to update.
     */
    limit?: number
  }

  /**
   * eventCursor updateManyAndReturn
   */
  export type eventCursorUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * The data used to update eventCursors.
     */
    data: XOR<eventCursorUpdateManyMutationInput, eventCursorUncheckedUpdateManyInput>
    /**
     * Filter which eventCursors to update
     */
    where?: eventCursorWhereInput
    /**
     * Limit how many eventCursors to update.
     */
    limit?: number
  }

  /**
   * eventCursor upsert
   */
  export type eventCursorUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * The filter to search for the eventCursor to update in case it exists.
     */
    where: eventCursorWhereUniqueInput
    /**
     * In case the eventCursor found by the `where` argument doesn't exist, create a new eventCursor with this data.
     */
    create: XOR<eventCursorCreateInput, eventCursorUncheckedCreateInput>
    /**
     * In case the eventCursor was found with the provided `where` argument, update it with this data.
     */
    update: XOR<eventCursorUpdateInput, eventCursorUncheckedUpdateInput>
  }

  /**
   * eventCursor delete
   */
  export type eventCursorDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
    /**
     * Filter which eventCursor to delete.
     */
    where: eventCursorWhereUniqueInput
  }

  /**
   * eventCursor deleteMany
   */
  export type eventCursorDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which eventCursors to delete
     */
    where?: eventCursorWhereInput
    /**
     * Limit how many eventCursors to delete.
     */
    limit?: number
  }

  /**
   * eventCursor without action
   */
  export type eventCursorDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the eventCursor
     */
    select?: eventCursorSelect<ExtArgs> | null
    /**
     * Omit specific fields from the eventCursor
     */
    omit?: eventCursorOmit<ExtArgs> | null
  }


  /**
   * Model userTransaction
   */

  export type AggregateUserTransaction = {
    _count: UserTransactionCountAggregateOutputType | null
    _avg: UserTransactionAvgAggregateOutputType | null
    _sum: UserTransactionSumAggregateOutputType | null
    _min: UserTransactionMinAggregateOutputType | null
    _max: UserTransactionMaxAggregateOutputType | null
  }

  export type UserTransactionAvgAggregateOutputType = {
    id: number | null
    timestamp: number | null
  }

  export type UserTransactionSumAggregateOutputType = {
    id: number | null
    timestamp: bigint | null
  }

  export type UserTransactionMinAggregateOutputType = {
    id: number | null
    userAddress: string | null
    poolId: string | null
    type: string | null
    token1: string | null
    token2: string | null
    amount1: string | null
    amount2: string | null
    lpAmount: string | null
    txDigest: string | null
    timestamp: bigint | null
    createdAt: Date | null
  }

  export type UserTransactionMaxAggregateOutputType = {
    id: number | null
    userAddress: string | null
    poolId: string | null
    type: string | null
    token1: string | null
    token2: string | null
    amount1: string | null
    amount2: string | null
    lpAmount: string | null
    txDigest: string | null
    timestamp: bigint | null
    createdAt: Date | null
  }

  export type UserTransactionCountAggregateOutputType = {
    id: number
    userAddress: number
    poolId: number
    type: number
    token1: number
    token2: number
    amount1: number
    amount2: number
    lpAmount: number
    txDigest: number
    timestamp: number
    createdAt: number
    _all: number
  }


  export type UserTransactionAvgAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type UserTransactionSumAggregateInputType = {
    id?: true
    timestamp?: true
  }

  export type UserTransactionMinAggregateInputType = {
    id?: true
    userAddress?: true
    poolId?: true
    type?: true
    token1?: true
    token2?: true
    amount1?: true
    amount2?: true
    lpAmount?: true
    txDigest?: true
    timestamp?: true
    createdAt?: true
  }

  export type UserTransactionMaxAggregateInputType = {
    id?: true
    userAddress?: true
    poolId?: true
    type?: true
    token1?: true
    token2?: true
    amount1?: true
    amount2?: true
    lpAmount?: true
    txDigest?: true
    timestamp?: true
    createdAt?: true
  }

  export type UserTransactionCountAggregateInputType = {
    id?: true
    userAddress?: true
    poolId?: true
    type?: true
    token1?: true
    token2?: true
    amount1?: true
    amount2?: true
    lpAmount?: true
    txDigest?: true
    timestamp?: true
    createdAt?: true
    _all?: true
  }

  export type UserTransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which userTransaction to aggregate.
     */
    where?: userTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userTransactions to fetch.
     */
    orderBy?: userTransactionOrderByWithRelationInput | userTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned userTransactions
    **/
    _count?: true | UserTransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserTransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserTransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserTransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserTransactionMaxAggregateInputType
  }

  export type GetUserTransactionAggregateType<T extends UserTransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateUserTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserTransaction[P]>
      : GetScalarType<T[P], AggregateUserTransaction[P]>
  }




  export type userTransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userTransactionWhereInput
    orderBy?: userTransactionOrderByWithAggregationInput | userTransactionOrderByWithAggregationInput[]
    by: UserTransactionScalarFieldEnum[] | UserTransactionScalarFieldEnum
    having?: userTransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserTransactionCountAggregateInputType | true
    _avg?: UserTransactionAvgAggregateInputType
    _sum?: UserTransactionSumAggregateInputType
    _min?: UserTransactionMinAggregateInputType
    _max?: UserTransactionMaxAggregateInputType
  }

  export type UserTransactionGroupByOutputType = {
    id: number
    userAddress: string
    poolId: string | null
    type: string
    token1: string | null
    token2: string | null
    amount1: string | null
    amount2: string | null
    lpAmount: string | null
    txDigest: string
    timestamp: bigint
    createdAt: Date
    _count: UserTransactionCountAggregateOutputType | null
    _avg: UserTransactionAvgAggregateOutputType | null
    _sum: UserTransactionSumAggregateOutputType | null
    _min: UserTransactionMinAggregateOutputType | null
    _max: UserTransactionMaxAggregateOutputType | null
  }

  type GetUserTransactionGroupByPayload<T extends userTransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserTransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserTransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserTransactionGroupByOutputType[P]>
            : GetScalarType<T[P], UserTransactionGroupByOutputType[P]>
        }
      >
    >


  export type userTransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    poolId?: boolean
    type?: boolean
    token1?: boolean
    token2?: boolean
    amount1?: boolean
    amount2?: boolean
    lpAmount?: boolean
    txDigest?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userTransaction"]>

  export type userTransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    poolId?: boolean
    type?: boolean
    token1?: boolean
    token2?: boolean
    amount1?: boolean
    amount2?: boolean
    lpAmount?: boolean
    txDigest?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userTransaction"]>

  export type userTransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userAddress?: boolean
    poolId?: boolean
    type?: boolean
    token1?: boolean
    token2?: boolean
    amount1?: boolean
    amount2?: boolean
    lpAmount?: boolean
    txDigest?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["userTransaction"]>

  export type userTransactionSelectScalar = {
    id?: boolean
    userAddress?: boolean
    poolId?: boolean
    type?: boolean
    token1?: boolean
    token2?: boolean
    amount1?: boolean
    amount2?: boolean
    lpAmount?: boolean
    txDigest?: boolean
    timestamp?: boolean
    createdAt?: boolean
  }

  export type userTransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userAddress" | "poolId" | "type" | "token1" | "token2" | "amount1" | "amount2" | "lpAmount" | "txDigest" | "timestamp" | "createdAt", ExtArgs["result"]["userTransaction"]>

  export type $userTransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "userTransaction"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userAddress: string
      poolId: string | null
      type: string
      token1: string | null
      token2: string | null
      amount1: string | null
      amount2: string | null
      lpAmount: string | null
      txDigest: string
      timestamp: bigint
      createdAt: Date
    }, ExtArgs["result"]["userTransaction"]>
    composites: {}
  }

  type userTransactionGetPayload<S extends boolean | null | undefined | userTransactionDefaultArgs> = $Result.GetResult<Prisma.$userTransactionPayload, S>

  type userTransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserTransactionCountAggregateInputType | true
    }

  export interface userTransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['userTransaction'], meta: { name: 'userTransaction' } }
    /**
     * Find zero or one UserTransaction that matches the filter.
     * @param {userTransactionFindUniqueArgs} args - Arguments to find a UserTransaction
     * @example
     * // Get one UserTransaction
     * const userTransaction = await prisma.userTransaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userTransactionFindUniqueArgs>(args: SelectSubset<T, userTransactionFindUniqueArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserTransaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userTransactionFindUniqueOrThrowArgs} args - Arguments to find a UserTransaction
     * @example
     * // Get one UserTransaction
     * const userTransaction = await prisma.userTransaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userTransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, userTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserTransaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionFindFirstArgs} args - Arguments to find a UserTransaction
     * @example
     * // Get one UserTransaction
     * const userTransaction = await prisma.userTransaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userTransactionFindFirstArgs>(args?: SelectSubset<T, userTransactionFindFirstArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserTransaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionFindFirstOrThrowArgs} args - Arguments to find a UserTransaction
     * @example
     * // Get one UserTransaction
     * const userTransaction = await prisma.userTransaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userTransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, userTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserTransactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserTransactions
     * const userTransactions = await prisma.userTransaction.findMany()
     * 
     * // Get first 10 UserTransactions
     * const userTransactions = await prisma.userTransaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userTransactionWithIdOnly = await prisma.userTransaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userTransactionFindManyArgs>(args?: SelectSubset<T, userTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserTransaction.
     * @param {userTransactionCreateArgs} args - Arguments to create a UserTransaction.
     * @example
     * // Create one UserTransaction
     * const UserTransaction = await prisma.userTransaction.create({
     *   data: {
     *     // ... data to create a UserTransaction
     *   }
     * })
     * 
     */
    create<T extends userTransactionCreateArgs>(args: SelectSubset<T, userTransactionCreateArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserTransactions.
     * @param {userTransactionCreateManyArgs} args - Arguments to create many UserTransactions.
     * @example
     * // Create many UserTransactions
     * const userTransaction = await prisma.userTransaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userTransactionCreateManyArgs>(args?: SelectSubset<T, userTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserTransactions and returns the data saved in the database.
     * @param {userTransactionCreateManyAndReturnArgs} args - Arguments to create many UserTransactions.
     * @example
     * // Create many UserTransactions
     * const userTransaction = await prisma.userTransaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserTransactions and only return the `id`
     * const userTransactionWithIdOnly = await prisma.userTransaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends userTransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, userTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserTransaction.
     * @param {userTransactionDeleteArgs} args - Arguments to delete one UserTransaction.
     * @example
     * // Delete one UserTransaction
     * const UserTransaction = await prisma.userTransaction.delete({
     *   where: {
     *     // ... filter to delete one UserTransaction
     *   }
     * })
     * 
     */
    delete<T extends userTransactionDeleteArgs>(args: SelectSubset<T, userTransactionDeleteArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserTransaction.
     * @param {userTransactionUpdateArgs} args - Arguments to update one UserTransaction.
     * @example
     * // Update one UserTransaction
     * const userTransaction = await prisma.userTransaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userTransactionUpdateArgs>(args: SelectSubset<T, userTransactionUpdateArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserTransactions.
     * @param {userTransactionDeleteManyArgs} args - Arguments to filter UserTransactions to delete.
     * @example
     * // Delete a few UserTransactions
     * const { count } = await prisma.userTransaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userTransactionDeleteManyArgs>(args?: SelectSubset<T, userTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserTransactions
     * const userTransaction = await prisma.userTransaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userTransactionUpdateManyArgs>(args: SelectSubset<T, userTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserTransactions and returns the data updated in the database.
     * @param {userTransactionUpdateManyAndReturnArgs} args - Arguments to update many UserTransactions.
     * @example
     * // Update many UserTransactions
     * const userTransaction = await prisma.userTransaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserTransactions and only return the `id`
     * const userTransactionWithIdOnly = await prisma.userTransaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends userTransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, userTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserTransaction.
     * @param {userTransactionUpsertArgs} args - Arguments to update or create a UserTransaction.
     * @example
     * // Update or create a UserTransaction
     * const userTransaction = await prisma.userTransaction.upsert({
     *   create: {
     *     // ... data to create a UserTransaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserTransaction we want to update
     *   }
     * })
     */
    upsert<T extends userTransactionUpsertArgs>(args: SelectSubset<T, userTransactionUpsertArgs<ExtArgs>>): Prisma__userTransactionClient<$Result.GetResult<Prisma.$userTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserTransactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionCountArgs} args - Arguments to filter UserTransactions to count.
     * @example
     * // Count the number of UserTransactions
     * const count = await prisma.userTransaction.count({
     *   where: {
     *     // ... the filter for the UserTransactions we want to count
     *   }
     * })
    **/
    count<T extends userTransactionCountArgs>(
      args?: Subset<T, userTransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserTransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserTransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserTransactionAggregateArgs>(args: Subset<T, UserTransactionAggregateArgs>): Prisma.PrismaPromise<GetUserTransactionAggregateType<T>>

    /**
     * Group by UserTransaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userTransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userTransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userTransactionGroupByArgs['orderBy'] }
        : { orderBy?: userTransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the userTransaction model
   */
  readonly fields: userTransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for userTransaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userTransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the userTransaction model
   */
  interface userTransactionFieldRefs {
    readonly id: FieldRef<"userTransaction", 'Int'>
    readonly userAddress: FieldRef<"userTransaction", 'String'>
    readonly poolId: FieldRef<"userTransaction", 'String'>
    readonly type: FieldRef<"userTransaction", 'String'>
    readonly token1: FieldRef<"userTransaction", 'String'>
    readonly token2: FieldRef<"userTransaction", 'String'>
    readonly amount1: FieldRef<"userTransaction", 'String'>
    readonly amount2: FieldRef<"userTransaction", 'String'>
    readonly lpAmount: FieldRef<"userTransaction", 'String'>
    readonly txDigest: FieldRef<"userTransaction", 'String'>
    readonly timestamp: FieldRef<"userTransaction", 'BigInt'>
    readonly createdAt: FieldRef<"userTransaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * userTransaction findUnique
   */
  export type userTransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter, which userTransaction to fetch.
     */
    where: userTransactionWhereUniqueInput
  }

  /**
   * userTransaction findUniqueOrThrow
   */
  export type userTransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter, which userTransaction to fetch.
     */
    where: userTransactionWhereUniqueInput
  }

  /**
   * userTransaction findFirst
   */
  export type userTransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter, which userTransaction to fetch.
     */
    where?: userTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userTransactions to fetch.
     */
    orderBy?: userTransactionOrderByWithRelationInput | userTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for userTransactions.
     */
    cursor?: userTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of userTransactions.
     */
    distinct?: UserTransactionScalarFieldEnum | UserTransactionScalarFieldEnum[]
  }

  /**
   * userTransaction findFirstOrThrow
   */
  export type userTransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter, which userTransaction to fetch.
     */
    where?: userTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userTransactions to fetch.
     */
    orderBy?: userTransactionOrderByWithRelationInput | userTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for userTransactions.
     */
    cursor?: userTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userTransactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of userTransactions.
     */
    distinct?: UserTransactionScalarFieldEnum | UserTransactionScalarFieldEnum[]
  }

  /**
   * userTransaction findMany
   */
  export type userTransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter, which userTransactions to fetch.
     */
    where?: userTransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of userTransactions to fetch.
     */
    orderBy?: userTransactionOrderByWithRelationInput | userTransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing userTransactions.
     */
    cursor?: userTransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` userTransactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` userTransactions.
     */
    skip?: number
    distinct?: UserTransactionScalarFieldEnum | UserTransactionScalarFieldEnum[]
  }

  /**
   * userTransaction create
   */
  export type userTransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * The data needed to create a userTransaction.
     */
    data: XOR<userTransactionCreateInput, userTransactionUncheckedCreateInput>
  }

  /**
   * userTransaction createMany
   */
  export type userTransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many userTransactions.
     */
    data: userTransactionCreateManyInput | userTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * userTransaction createManyAndReturn
   */
  export type userTransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * The data used to create many userTransactions.
     */
    data: userTransactionCreateManyInput | userTransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * userTransaction update
   */
  export type userTransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * The data needed to update a userTransaction.
     */
    data: XOR<userTransactionUpdateInput, userTransactionUncheckedUpdateInput>
    /**
     * Choose, which userTransaction to update.
     */
    where: userTransactionWhereUniqueInput
  }

  /**
   * userTransaction updateMany
   */
  export type userTransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update userTransactions.
     */
    data: XOR<userTransactionUpdateManyMutationInput, userTransactionUncheckedUpdateManyInput>
    /**
     * Filter which userTransactions to update
     */
    where?: userTransactionWhereInput
    /**
     * Limit how many userTransactions to update.
     */
    limit?: number
  }

  /**
   * userTransaction updateManyAndReturn
   */
  export type userTransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * The data used to update userTransactions.
     */
    data: XOR<userTransactionUpdateManyMutationInput, userTransactionUncheckedUpdateManyInput>
    /**
     * Filter which userTransactions to update
     */
    where?: userTransactionWhereInput
    /**
     * Limit how many userTransactions to update.
     */
    limit?: number
  }

  /**
   * userTransaction upsert
   */
  export type userTransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * The filter to search for the userTransaction to update in case it exists.
     */
    where: userTransactionWhereUniqueInput
    /**
     * In case the userTransaction found by the `where` argument doesn't exist, create a new userTransaction with this data.
     */
    create: XOR<userTransactionCreateInput, userTransactionUncheckedCreateInput>
    /**
     * In case the userTransaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userTransactionUpdateInput, userTransactionUncheckedUpdateInput>
  }

  /**
   * userTransaction delete
   */
  export type userTransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
    /**
     * Filter which userTransaction to delete.
     */
    where: userTransactionWhereUniqueInput
  }

  /**
   * userTransaction deleteMany
   */
  export type userTransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which userTransactions to delete
     */
    where?: userTransactionWhereInput
    /**
     * Limit how many userTransactions to delete.
     */
    limit?: number
  }

  /**
   * userTransaction without action
   */
  export type userTransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the userTransaction
     */
    select?: userTransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the userTransaction
     */
    omit?: userTransactionOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const PoolEventScalarFieldEnum: {
    id: 'id',
    digest: 'digest',
    type: 'type',
    sender: 'sender',
    payload: 'payload',
    timestamp: 'timestamp',
    processed: 'processed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PoolEventScalarFieldEnum = (typeof PoolEventScalarFieldEnum)[keyof typeof PoolEventScalarFieldEnum]


  export const PoolScalarFieldEnum: {
    id: 'id',
    poolId: 'poolId',
    token1: 'token1',
    token2: 'token2',
    reserveA: 'reserveA',
    reserveB: 'reserveB',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PoolScalarFieldEnum = (typeof PoolScalarFieldEnum)[keyof typeof PoolScalarFieldEnum]


  export const EventCursorScalarFieldEnum: {
    id: 'id',
    txDigest: 'txDigest',
    eventSeq: 'eventSeq',
    updatedAt: 'updatedAt'
  };

  export type EventCursorScalarFieldEnum = (typeof EventCursorScalarFieldEnum)[keyof typeof EventCursorScalarFieldEnum]


  export const UserTransactionScalarFieldEnum: {
    id: 'id',
    userAddress: 'userAddress',
    poolId: 'poolId',
    type: 'type',
    token1: 'token1',
    token2: 'token2',
    amount1: 'amount1',
    amount2: 'amount2',
    lpAmount: 'lpAmount',
    txDigest: 'txDigest',
    timestamp: 'timestamp',
    createdAt: 'createdAt'
  };

  export type UserTransactionScalarFieldEnum = (typeof UserTransactionScalarFieldEnum)[keyof typeof UserTransactionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'BigInt[]'
   */
  export type ListBigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type poolEventWhereInput = {
    AND?: poolEventWhereInput | poolEventWhereInput[]
    OR?: poolEventWhereInput[]
    NOT?: poolEventWhereInput | poolEventWhereInput[]
    id?: IntFilter<"poolEvent"> | number
    digest?: StringFilter<"poolEvent"> | string
    type?: StringFilter<"poolEvent"> | string
    sender?: StringNullableFilter<"poolEvent"> | string | null
    payload?: JsonFilter<"poolEvent">
    timestamp?: BigIntFilter<"poolEvent"> | bigint | number
    processed?: BoolFilter<"poolEvent"> | boolean
    createdAt?: DateTimeFilter<"poolEvent"> | Date | string
    updatedAt?: DateTimeFilter<"poolEvent"> | Date | string
  }

  export type poolEventOrderByWithRelationInput = {
    id?: SortOrder
    digest?: SortOrder
    type?: SortOrder
    sender?: SortOrderInput | SortOrder
    payload?: SortOrder
    timestamp?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    digest?: string
    AND?: poolEventWhereInput | poolEventWhereInput[]
    OR?: poolEventWhereInput[]
    NOT?: poolEventWhereInput | poolEventWhereInput[]
    type?: StringFilter<"poolEvent"> | string
    sender?: StringNullableFilter<"poolEvent"> | string | null
    payload?: JsonFilter<"poolEvent">
    timestamp?: BigIntFilter<"poolEvent"> | bigint | number
    processed?: BoolFilter<"poolEvent"> | boolean
    createdAt?: DateTimeFilter<"poolEvent"> | Date | string
    updatedAt?: DateTimeFilter<"poolEvent"> | Date | string
  }, "id" | "digest">

  export type poolEventOrderByWithAggregationInput = {
    id?: SortOrder
    digest?: SortOrder
    type?: SortOrder
    sender?: SortOrderInput | SortOrder
    payload?: SortOrder
    timestamp?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: poolEventCountOrderByAggregateInput
    _avg?: poolEventAvgOrderByAggregateInput
    _max?: poolEventMaxOrderByAggregateInput
    _min?: poolEventMinOrderByAggregateInput
    _sum?: poolEventSumOrderByAggregateInput
  }

  export type poolEventScalarWhereWithAggregatesInput = {
    AND?: poolEventScalarWhereWithAggregatesInput | poolEventScalarWhereWithAggregatesInput[]
    OR?: poolEventScalarWhereWithAggregatesInput[]
    NOT?: poolEventScalarWhereWithAggregatesInput | poolEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"poolEvent"> | number
    digest?: StringWithAggregatesFilter<"poolEvent"> | string
    type?: StringWithAggregatesFilter<"poolEvent"> | string
    sender?: StringNullableWithAggregatesFilter<"poolEvent"> | string | null
    payload?: JsonWithAggregatesFilter<"poolEvent">
    timestamp?: BigIntWithAggregatesFilter<"poolEvent"> | bigint | number
    processed?: BoolWithAggregatesFilter<"poolEvent"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"poolEvent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"poolEvent"> | Date | string
  }

  export type poolWhereInput = {
    AND?: poolWhereInput | poolWhereInput[]
    OR?: poolWhereInput[]
    NOT?: poolWhereInput | poolWhereInput[]
    id?: IntFilter<"pool"> | number
    poolId?: StringFilter<"pool"> | string
    token1?: StringNullableFilter<"pool"> | string | null
    token2?: StringNullableFilter<"pool"> | string | null
    reserveA?: BigIntFilter<"pool"> | bigint | number
    reserveB?: BigIntFilter<"pool"> | bigint | number
    createdAt?: DateTimeFilter<"pool"> | Date | string
    updatedAt?: DateTimeFilter<"pool"> | Date | string
  }

  export type poolOrderByWithRelationInput = {
    id?: SortOrder
    poolId?: SortOrder
    token1?: SortOrderInput | SortOrder
    token2?: SortOrderInput | SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    poolId?: string
    AND?: poolWhereInput | poolWhereInput[]
    OR?: poolWhereInput[]
    NOT?: poolWhereInput | poolWhereInput[]
    token1?: StringNullableFilter<"pool"> | string | null
    token2?: StringNullableFilter<"pool"> | string | null
    reserveA?: BigIntFilter<"pool"> | bigint | number
    reserveB?: BigIntFilter<"pool"> | bigint | number
    createdAt?: DateTimeFilter<"pool"> | Date | string
    updatedAt?: DateTimeFilter<"pool"> | Date | string
  }, "id" | "poolId">

  export type poolOrderByWithAggregationInput = {
    id?: SortOrder
    poolId?: SortOrder
    token1?: SortOrderInput | SortOrder
    token2?: SortOrderInput | SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: poolCountOrderByAggregateInput
    _avg?: poolAvgOrderByAggregateInput
    _max?: poolMaxOrderByAggregateInput
    _min?: poolMinOrderByAggregateInput
    _sum?: poolSumOrderByAggregateInput
  }

  export type poolScalarWhereWithAggregatesInput = {
    AND?: poolScalarWhereWithAggregatesInput | poolScalarWhereWithAggregatesInput[]
    OR?: poolScalarWhereWithAggregatesInput[]
    NOT?: poolScalarWhereWithAggregatesInput | poolScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"pool"> | number
    poolId?: StringWithAggregatesFilter<"pool"> | string
    token1?: StringNullableWithAggregatesFilter<"pool"> | string | null
    token2?: StringNullableWithAggregatesFilter<"pool"> | string | null
    reserveA?: BigIntWithAggregatesFilter<"pool"> | bigint | number
    reserveB?: BigIntWithAggregatesFilter<"pool"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"pool"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"pool"> | Date | string
  }

  export type eventCursorWhereInput = {
    AND?: eventCursorWhereInput | eventCursorWhereInput[]
    OR?: eventCursorWhereInput[]
    NOT?: eventCursorWhereInput | eventCursorWhereInput[]
    id?: StringFilter<"eventCursor"> | string
    txDigest?: StringNullableFilter<"eventCursor"> | string | null
    eventSeq?: IntNullableFilter<"eventCursor"> | number | null
    updatedAt?: DateTimeFilter<"eventCursor"> | Date | string
  }

  export type eventCursorOrderByWithRelationInput = {
    id?: SortOrder
    txDigest?: SortOrderInput | SortOrder
    eventSeq?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
  }

  export type eventCursorWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: eventCursorWhereInput | eventCursorWhereInput[]
    OR?: eventCursorWhereInput[]
    NOT?: eventCursorWhereInput | eventCursorWhereInput[]
    txDigest?: StringNullableFilter<"eventCursor"> | string | null
    eventSeq?: IntNullableFilter<"eventCursor"> | number | null
    updatedAt?: DateTimeFilter<"eventCursor"> | Date | string
  }, "id">

  export type eventCursorOrderByWithAggregationInput = {
    id?: SortOrder
    txDigest?: SortOrderInput | SortOrder
    eventSeq?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    _count?: eventCursorCountOrderByAggregateInput
    _avg?: eventCursorAvgOrderByAggregateInput
    _max?: eventCursorMaxOrderByAggregateInput
    _min?: eventCursorMinOrderByAggregateInput
    _sum?: eventCursorSumOrderByAggregateInput
  }

  export type eventCursorScalarWhereWithAggregatesInput = {
    AND?: eventCursorScalarWhereWithAggregatesInput | eventCursorScalarWhereWithAggregatesInput[]
    OR?: eventCursorScalarWhereWithAggregatesInput[]
    NOT?: eventCursorScalarWhereWithAggregatesInput | eventCursorScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"eventCursor"> | string
    txDigest?: StringNullableWithAggregatesFilter<"eventCursor"> | string | null
    eventSeq?: IntNullableWithAggregatesFilter<"eventCursor"> | number | null
    updatedAt?: DateTimeWithAggregatesFilter<"eventCursor"> | Date | string
  }

  export type userTransactionWhereInput = {
    AND?: userTransactionWhereInput | userTransactionWhereInput[]
    OR?: userTransactionWhereInput[]
    NOT?: userTransactionWhereInput | userTransactionWhereInput[]
    id?: IntFilter<"userTransaction"> | number
    userAddress?: StringFilter<"userTransaction"> | string
    poolId?: StringNullableFilter<"userTransaction"> | string | null
    type?: StringFilter<"userTransaction"> | string
    token1?: StringNullableFilter<"userTransaction"> | string | null
    token2?: StringNullableFilter<"userTransaction"> | string | null
    amount1?: StringNullableFilter<"userTransaction"> | string | null
    amount2?: StringNullableFilter<"userTransaction"> | string | null
    lpAmount?: StringNullableFilter<"userTransaction"> | string | null
    txDigest?: StringFilter<"userTransaction"> | string
    timestamp?: BigIntFilter<"userTransaction"> | bigint | number
    createdAt?: DateTimeFilter<"userTransaction"> | Date | string
  }

  export type userTransactionOrderByWithRelationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    poolId?: SortOrderInput | SortOrder
    type?: SortOrder
    token1?: SortOrderInput | SortOrder
    token2?: SortOrderInput | SortOrder
    amount1?: SortOrderInput | SortOrder
    amount2?: SortOrderInput | SortOrder
    lpAmount?: SortOrderInput | SortOrder
    txDigest?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type userTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    txDigest?: string
    AND?: userTransactionWhereInput | userTransactionWhereInput[]
    OR?: userTransactionWhereInput[]
    NOT?: userTransactionWhereInput | userTransactionWhereInput[]
    userAddress?: StringFilter<"userTransaction"> | string
    poolId?: StringNullableFilter<"userTransaction"> | string | null
    type?: StringFilter<"userTransaction"> | string
    token1?: StringNullableFilter<"userTransaction"> | string | null
    token2?: StringNullableFilter<"userTransaction"> | string | null
    amount1?: StringNullableFilter<"userTransaction"> | string | null
    amount2?: StringNullableFilter<"userTransaction"> | string | null
    lpAmount?: StringNullableFilter<"userTransaction"> | string | null
    timestamp?: BigIntFilter<"userTransaction"> | bigint | number
    createdAt?: DateTimeFilter<"userTransaction"> | Date | string
  }, "id" | "txDigest">

  export type userTransactionOrderByWithAggregationInput = {
    id?: SortOrder
    userAddress?: SortOrder
    poolId?: SortOrderInput | SortOrder
    type?: SortOrder
    token1?: SortOrderInput | SortOrder
    token2?: SortOrderInput | SortOrder
    amount1?: SortOrderInput | SortOrder
    amount2?: SortOrderInput | SortOrder
    lpAmount?: SortOrderInput | SortOrder
    txDigest?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
    _count?: userTransactionCountOrderByAggregateInput
    _avg?: userTransactionAvgOrderByAggregateInput
    _max?: userTransactionMaxOrderByAggregateInput
    _min?: userTransactionMinOrderByAggregateInput
    _sum?: userTransactionSumOrderByAggregateInput
  }

  export type userTransactionScalarWhereWithAggregatesInput = {
    AND?: userTransactionScalarWhereWithAggregatesInput | userTransactionScalarWhereWithAggregatesInput[]
    OR?: userTransactionScalarWhereWithAggregatesInput[]
    NOT?: userTransactionScalarWhereWithAggregatesInput | userTransactionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"userTransaction"> | number
    userAddress?: StringWithAggregatesFilter<"userTransaction"> | string
    poolId?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    type?: StringWithAggregatesFilter<"userTransaction"> | string
    token1?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    token2?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    amount1?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    amount2?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    lpAmount?: StringNullableWithAggregatesFilter<"userTransaction"> | string | null
    txDigest?: StringWithAggregatesFilter<"userTransaction"> | string
    timestamp?: BigIntWithAggregatesFilter<"userTransaction"> | bigint | number
    createdAt?: DateTimeWithAggregatesFilter<"userTransaction"> | Date | string
  }

  export type poolEventCreateInput = {
    digest: string
    type: string
    sender?: string | null
    payload: JsonNullValueInput | InputJsonValue
    timestamp: bigint | number
    processed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolEventUncheckedCreateInput = {
    id?: number
    digest: string
    type: string
    sender?: string | null
    payload: JsonNullValueInput | InputJsonValue
    timestamp: bigint | number
    processed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolEventUpdateInput = {
    digest?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    digest?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolEventCreateManyInput = {
    id?: number
    digest: string
    type: string
    sender?: string | null
    payload: JsonNullValueInput | InputJsonValue
    timestamp: bigint | number
    processed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolEventUpdateManyMutationInput = {
    digest?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    digest?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    sender?: NullableStringFieldUpdateOperationsInput | string | null
    payload?: JsonNullValueInput | InputJsonValue
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    processed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolCreateInput = {
    poolId: string
    token1?: string | null
    token2?: string | null
    reserveA: bigint | number
    reserveB: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolUncheckedCreateInput = {
    id?: number
    poolId: string
    token1?: string | null
    token2?: string | null
    reserveA: bigint | number
    reserveB: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolUpdateInput = {
    poolId?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    reserveA?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveB?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    reserveA?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveB?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolCreateManyInput = {
    id?: number
    poolId: string
    token1?: string | null
    token2?: string | null
    reserveA: bigint | number
    reserveB: bigint | number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type poolUpdateManyMutationInput = {
    poolId?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    reserveA?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveB?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type poolUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    poolId?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    reserveA?: BigIntFieldUpdateOperationsInput | bigint | number
    reserveB?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type eventCursorCreateInput = {
    id: string
    txDigest?: string | null
    eventSeq?: number | null
    updatedAt?: Date | string
  }

  export type eventCursorUncheckedCreateInput = {
    id: string
    txDigest?: string | null
    eventSeq?: number | null
    updatedAt?: Date | string
  }

  export type eventCursorUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    eventSeq?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type eventCursorUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    eventSeq?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type eventCursorCreateManyInput = {
    id: string
    txDigest?: string | null
    eventSeq?: number | null
    updatedAt?: Date | string
  }

  export type eventCursorUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    eventSeq?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type eventCursorUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    txDigest?: NullableStringFieldUpdateOperationsInput | string | null
    eventSeq?: NullableIntFieldUpdateOperationsInput | number | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userTransactionCreateInput = {
    userAddress: string
    poolId?: string | null
    type: string
    token1?: string | null
    token2?: string | null
    amount1?: string | null
    amount2?: string | null
    lpAmount?: string | null
    txDigest: string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type userTransactionUncheckedCreateInput = {
    id?: number
    userAddress: string
    poolId?: string | null
    type: string
    token1?: string | null
    token2?: string | null
    amount1?: string | null
    amount2?: string | null
    lpAmount?: string | null
    txDigest: string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type userTransactionUpdateInput = {
    userAddress?: StringFieldUpdateOperationsInput | string
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    amount1?: NullableStringFieldUpdateOperationsInput | string | null
    amount2?: NullableStringFieldUpdateOperationsInput | string | null
    lpAmount?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userTransactionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    amount1?: NullableStringFieldUpdateOperationsInput | string | null
    amount2?: NullableStringFieldUpdateOperationsInput | string | null
    lpAmount?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userTransactionCreateManyInput = {
    id?: number
    userAddress: string
    poolId?: string | null
    type: string
    token1?: string | null
    token2?: string | null
    amount1?: string | null
    amount2?: string | null
    lpAmount?: string | null
    txDigest: string
    timestamp: bigint | number
    createdAt?: Date | string
  }

  export type userTransactionUpdateManyMutationInput = {
    userAddress?: StringFieldUpdateOperationsInput | string
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    amount1?: NullableStringFieldUpdateOperationsInput | string | null
    amount2?: NullableStringFieldUpdateOperationsInput | string | null
    lpAmount?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userTransactionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userAddress?: StringFieldUpdateOperationsInput | string
    poolId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: StringFieldUpdateOperationsInput | string
    token1?: NullableStringFieldUpdateOperationsInput | string | null
    token2?: NullableStringFieldUpdateOperationsInput | string | null
    amount1?: NullableStringFieldUpdateOperationsInput | string | null
    amount2?: NullableStringFieldUpdateOperationsInput | string | null
    lpAmount?: NullableStringFieldUpdateOperationsInput | string | null
    txDigest?: StringFieldUpdateOperationsInput | string
    timestamp?: BigIntFieldUpdateOperationsInput | bigint | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type poolEventCountOrderByAggregateInput = {
    id?: SortOrder
    digest?: SortOrder
    type?: SortOrder
    sender?: SortOrder
    payload?: SortOrder
    timestamp?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolEventAvgOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type poolEventMaxOrderByAggregateInput = {
    id?: SortOrder
    digest?: SortOrder
    type?: SortOrder
    sender?: SortOrder
    timestamp?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolEventMinOrderByAggregateInput = {
    id?: SortOrder
    digest?: SortOrder
    type?: SortOrder
    sender?: SortOrder
    timestamp?: SortOrder
    processed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolEventSumOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type poolCountOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolAvgOrderByAggregateInput = {
    id?: SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
  }

  export type poolMaxOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolMinOrderByAggregateInput = {
    id?: SortOrder
    poolId?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type poolSumOrderByAggregateInput = {
    id?: SortOrder
    reserveA?: SortOrder
    reserveB?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type eventCursorCountOrderByAggregateInput = {
    id?: SortOrder
    txDigest?: SortOrder
    eventSeq?: SortOrder
    updatedAt?: SortOrder
  }

  export type eventCursorAvgOrderByAggregateInput = {
    eventSeq?: SortOrder
  }

  export type eventCursorMaxOrderByAggregateInput = {
    id?: SortOrder
    txDigest?: SortOrder
    eventSeq?: SortOrder
    updatedAt?: SortOrder
  }

  export type eventCursorMinOrderByAggregateInput = {
    id?: SortOrder
    txDigest?: SortOrder
    eventSeq?: SortOrder
    updatedAt?: SortOrder
  }

  export type eventCursorSumOrderByAggregateInput = {
    eventSeq?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type userTransactionCountOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    poolId?: SortOrder
    type?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    amount1?: SortOrder
    amount2?: SortOrder
    lpAmount?: SortOrder
    txDigest?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type userTransactionAvgOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type userTransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    poolId?: SortOrder
    type?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    amount1?: SortOrder
    amount2?: SortOrder
    lpAmount?: SortOrder
    txDigest?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type userTransactionMinOrderByAggregateInput = {
    id?: SortOrder
    userAddress?: SortOrder
    poolId?: SortOrder
    type?: SortOrder
    token1?: SortOrder
    token2?: SortOrder
    amount1?: SortOrder
    amount2?: SortOrder
    lpAmount?: SortOrder
    txDigest?: SortOrder
    timestamp?: SortOrder
    createdAt?: SortOrder
  }

  export type userTransactionSumOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    notIn?: bigint[] | number[] | ListBigIntFieldRefInput<$PrismaModel>
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}