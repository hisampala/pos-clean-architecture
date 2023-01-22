import { KeyCache } from "src/infrastructure/contant";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";
export class getOrderItemUsecases implements IUseCases {
  constructor(private context: PrismaService, private cache: CacheingService) {}
  async execute(id: string) {
    const order = await this.cache.getById(KeyCache.ORDERCACHE, id);
    if (order) {
      return order;
    }
    return await this.context.orders.findFirst({ where: { id: id } });
  }
}
