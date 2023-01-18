import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validOrderById } from "./validOrderById.usecases";

export class DeleteOrderUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    await new validOrderById(this.context).isValid(id);
    return await this.context.orders.delete({ where: { id: id } });
  }
}
