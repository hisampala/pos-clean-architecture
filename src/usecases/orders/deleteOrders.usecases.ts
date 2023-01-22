import { KeyCache } from "src/infrastructure/contant";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { CacheingService } from "src/infrastructure/service/cache/cacheing.service";
import { validOrderById } from "./validOrderById.usecases";

export class DeleteOrderUsecases implements IUseCases {
  constructor(private context: PrismaService, private cache: CacheingService) {}
  async execute(id: string) {
    await new validOrderById(this.context).isValid(id);
    const deleted = await this.context.orders.delete({ where: { id: id } });
    await this.cache.delete(KeyCache.ORDERCACHE, deleted.id);
    return deleted;
  }
}
