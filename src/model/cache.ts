export type CachedData<T> = {
  key: string;
  expiration: number;
  data: T;
};
