export type IterableKeys<T> = {
  [K in keyof T]: NonNullable<T[K]> extends readonly (infer _)[] ? K : never;
}[keyof T];
