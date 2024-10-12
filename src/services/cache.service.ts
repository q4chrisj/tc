import * as fs from "node:fs/promises";
import crypto from "crypto";

type CachedData<T> = {
  key: string;
  expiration: number;
  data: T;
};

export class CacheService {
  get = async <T>(key: string): Promise<T> => {
    const cacheKey = this._createCacheKey(key);
    const cacheEntry = `.cache/${cacheKey}.json`;

    const cacheEntryExists = await _exists(cacheEntry);
    if (!cacheEntryExists) {
      return null as T;
    }

    const cacheString = await fs.readFile(cacheEntry, "utf8");
    const result: CachedData<T> = JSON.parse(cacheString);
    const now = Date.now();
    if (result.expiration < now) {
      console.log("Cache expired");
      return null as T;
    }
    return result.data;
  };

  set = async <T>(
    key: string,
    value: T,
    expirySeconds: number = 60,
  ): Promise<void> => {
    const cacheKey = this._createCacheKey(key);
    const cacheEntry = `.cache/${cacheKey}.json`;

    const cacheData: CachedData<T> = {
      key: cacheKey,
      expiration: Date.now() + expirySeconds * 1000, // 1 minute
      data: value,
    };

    await fs.writeFile(cacheEntry, JSON.stringify(cacheData), "utf8");
  };

  static init = async (): Promise<void> => {
    const cacheExists = await _exists(".cache");
    if (!cacheExists) {
      await fs.mkdir(".cache");
    }
  };

  static clear = async (): Promise<void> => {
    await fs.rm(".cache", { recursive: true }).catch(() => { });
  };

  _createCacheKey = (cacheKeyString: string) => {
    return crypto.createHash("md5").update(cacheKeyString).digest("hex");
  };
}
const _exists = async (path: string): Promise<Boolean> => {
  return await fs
    .access(path, fs.constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
