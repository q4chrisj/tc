import { CacheService } from "../../services/cache.service";

export async function handleClearCache(): Promise<void> {
  CacheService.clear();

  console.log("Cache cleared");
}
