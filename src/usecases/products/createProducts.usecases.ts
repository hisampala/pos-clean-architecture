import { ProductsCreateItem } from "src/domain/models";
import { IUseCases } from "src/infrastructure/interfaces";

import { PrismaService } from "../../infrastructure/service/";

export class CreateProductsUseCases implements IUseCases {
  constructor(private context: PrismaService) {}
  async execute(item: ProductsCreateItem) {
    return this.context.products.create({ data: item });
  }
}
