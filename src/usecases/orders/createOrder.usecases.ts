import { OrdersCreateItem } from "src/domain/models";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";

export class CreateOrderUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(item: OrdersCreateItem) {
    return await this.context.orders.create({ data: item });
  }
}
