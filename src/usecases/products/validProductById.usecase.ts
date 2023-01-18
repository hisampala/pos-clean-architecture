import { BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/infrastructure/service";
import { isNullOrUndefined } from "util";

export class validProductById {
  constructor(private context: PrismaService) {}
  async isValid(id: string) {
    const isProducts = await this.context.products.findFirst({
      where: { id: id },
    });
    if (isNullOrUndefined(isProducts)) {
      throw new BadRequestException(`Not found ProductId:: ${id} `);
    }
  }
}
