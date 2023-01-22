import { OrdersCreateItem } from "src/domain/models";
import { KeyCache } from "src/infrastructure/contant";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";

export class CreateOrderUsecases implements IUseCases {
  constructor(private context: PrismaService, private cache: CacheingService) {}
  async execute(item: OrdersCreateItem) {
    const order = await this.context.orders.create({ data: item });
    const list = await this.cache.get(KeyCache.ORDERCACHE);
    list.push(order);
    await this.cache.insert(KeyCache.ORDERCACHE, list);
    return order;
  }
}
