import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validOrderDetailById } from "./validOrderDetailById.usecases";

export class DeleteOrderDetailUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    await new validOrderDetailById(this.context).isValid(id);
    return this.context.orderDetail.delete({ where: { id: id } });
  }
}
