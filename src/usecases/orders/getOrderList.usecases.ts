import { KeyCache } from "src/infrastructure/contant";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";

export class GetOrderListUsecases implements IUseCases {
  constructor(private context: PrismaService, private cache: CacheingService) {}
  async execute() {
    const cache = await this.cache.get(KeyCache.ORDERCACHE);
    if (cache.length > 0) {
      return cache;
    }
    const orders = await this.context.orders.findMany();
    await this.cache.insert(KeyCache.ORDERCACHE, orders);
    return orders;
  }
}
