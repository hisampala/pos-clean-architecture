import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";

export class getOrderItemUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    return this.context.orders.findFirst({ where: { id: id } });
  }
}
