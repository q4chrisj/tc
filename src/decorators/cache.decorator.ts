import { CacheService } from "../services/cache.service";

export function cacheable(originalMethod: any, _context: any) {
  const _cacheService = new CacheService();
  async function returnCachedData(this: any, ...args: any[]) {
    const cacheKey = `${originalMethod.name}_${args.join("_")}`;
    const cacheData = await _cacheService.get(cacheKey);
    if (cacheData) {
      return cacheData;
    }

    const response = await originalMethod.apply(this, args);

    await _cacheService.set(cacheKey, response);

    return response;
  }
  return returnCachedData;
}
