import { OrderDetailUpdateItem } from "src/domain/models";
import { PrismaService } from "src/infrastructure/service";
import { validOrderById } from "../orders/validOrderById.usecases";
import { validProductById } from "../products";
import { validOrderDetailById } from "./validOrderDetailById.usecases";

export class UpdateOrderDetailUsecases {
  constructor(private context: PrismaService) {}
  async execute(id: string, item: OrderDetailUpdateItem) {
    if (item.id) delete item.id;
    await new validProductById(this.context).isValid(item.productId);
    await new validOrderById(this.context).isValid(item.orderId);
    await new validOrderDetailById(this.context).isValid(id);
    return await this.context.orderDetail.update({
      where: { id: id },
      data: item,
    });
  }
}
