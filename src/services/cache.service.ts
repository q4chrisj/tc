import * as fs from "node:fs/promises";
import crypto from "crypto";

export class CacheService {
  get = async <T>(key: string): Promise<T> => {
    const cacheKey = this._createCacheKey(key);
    const cacheEntry = `.cache/${cacheKey}.json`;

    const cacheEntryExists = await _exists(cacheEntry);
    if (!cacheEntryExists) {
      return null as T;
    }

    const cachedData = await fs.readFile(cacheEntry, "utf8");
    const result: T = JSON.parse(cachedData);
    return result;
  };

  set = async (key: string, value: any): Promise<void> => {
    const cacheKey = this._createCacheKey(key);
    const cacheEntry = `.cache/${cacheKey}.json`;

    await fs.writeFile(cacheEntry, JSON.stringify(value), "utf8");
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

  _ensureCacheDirectory = async (): Promise<void> => { };

  _createCacheKey = (requestUri: string) => {
    return crypto.createHash("md5").update(requestUri).digest("hex");
  };
}
const _exists = async (cacheEntry: string): Promise<Boolean> => {
  return await fs
    .access(cacheEntry, fs.constants.F_OK)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
