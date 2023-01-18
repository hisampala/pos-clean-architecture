import { ProductsUpdateItem } from "src/domain/models";
import { IUseCases } from "src/infrastructure/interfaces";
import { PrismaService } from "src/infrastructure/service";
import { validProductById } from "./validProductById.usecase";

export class UpdateProductsUserCases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(id: string, item: ProductsUpdateItem) {
    if (item.id) delete item.id;
    await new validProductById(this.context).isValid(id);
    return await this.context.products.update({
      where: { id: id },
      data: item,
    });
  }
}
