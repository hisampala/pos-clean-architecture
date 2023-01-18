import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validProductById } from "./validProductById.usecase";

export class DeleteProductUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    await new validProductById(this.context).isValid(id);
    return this.context.products.delete({ where: { id: id } });
  }
}
