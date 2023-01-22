import { OrdersUpdateItem } from "src/domain/models";
import { KeyCache } from "src/infrastructure/contant";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";
import { validOrderById } from "./validOrderById.usecases";

export class UpdateOrderUsecases {
  constructor(private context: PrismaService, private cache: CacheingService) {}
  async execute(id: string, item: OrdersUpdateItem) {
    if (item.id) delete item.id;
    await new validOrderById(this.context).isValid(id);
    const updated = await this.context.orders.update({
      where: { id: id },
      data: item,
    });
    await this.cache.update(KeyCache.ORDERCACHE, updated.id, updated);
    return updated;
  }
}
