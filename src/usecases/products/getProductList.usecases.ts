import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";

export class GetProductListUsecases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute() {
    return this.context.products.findMany();
  }
}
