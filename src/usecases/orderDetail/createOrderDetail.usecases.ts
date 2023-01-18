import { OrderDetailCreateItem } from "src/domain/models";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validOrderById } from "../orders/";
import { validProductById } from "../products";

export class CreateOrderDetailUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(item: OrderDetailCreateItem) {
    await new validProductById(this.context).isValid(item.productId);
    await new validOrderById(this.context).isValid(item.orderId);
    return await this.context.orderDetail.create({ data: item });
  }
}
