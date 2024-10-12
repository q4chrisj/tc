import { CacheService } from "../services/cache.service";

export const cacheable =
  <T>(cacheExpiry: number = 60): Function =>
    (originalMethod: any, _context: any) => {
      const _cacheService = new CacheService();
      async function returnCachedData(this: any, ...args: any[]) {
        const cacheKey = `${originalMethod.name}_${args.join("_")}`;
        const cacheData = await _cacheService.get<T>(cacheKey);
        if (cacheData) {
          return cacheData;
        }

        console.log("Cache expired");
        const response = await originalMethod.apply(this, args);

        await _cacheService.set<T>(cacheKey, response, cacheExpiry);

        return response;
      }
      return returnCachedData;
    };
