import { CacheService } from "../services/cache.service";

export function cacheable(originalMethod: any, _context: any) {
  const _cacheService = new CacheService();
  async function replacementMethod(this: any, ...args: any[]) {
    const cacheKey = `${originalMethod.name}_${args.join("_")}`;
    const cacheData = await _cacheService.get(cacheKey);
    console.log("in cache decorator");
    if (cacheData) {
      // console.log("cache hit", cacheData);
      return cacheData;
    }

    const response = await originalMethod.apply(this, args);

    await _cacheService.set(cacheKey, response);

    return response;
  }
  return replacementMethod;
}
