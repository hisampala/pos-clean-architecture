import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
export class GetProductItemUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string) {
    return this.context.products.findFirst({ where: { id: id } });
  }
}
