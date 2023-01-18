import { OrdersUpdateItem } from "src/domain/models";
import { PrismaService } from "src/infrastructure/service";
import { validOrderById } from "./validOrderById.usecases";

export class UpdateOrderUsecases {
  constructor(private context: PrismaService) {}
  async execute(id: string, item: OrdersUpdateItem) {
    if (item.id) delete item.id;
    await new validOrderById(this.context).isValid(id);
    return await this.context.orders.update({
      where: { id: id },
      data: item,
    });
  }
}
