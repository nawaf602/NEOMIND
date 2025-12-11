export type Maybe<T> = T | null | undefined;

export const isSome = <T>(value: Maybe<T>): value is T =>
  value !== null && value !== undefined;

export const isNone = <T>(value: Maybe<T>): value is null | undefined =>
  !isSome(value);
