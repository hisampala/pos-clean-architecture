import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";

export class GetReceiveProductListUsecase implements IUseCases {
  constructor(private context: PrismaService) {}
  execute() {
    return this.context.receiveProduct.findMany();
  }
}
